package com.github.SkySpiral7.HumansAndHeroes;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Comparator;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import com.github.SkySpiral7.Java.pojo.FileGatherer;
import com.github.SkySpiral7.Java.util.FileIoUtil;
import com.github.SkySpiral7.Java.util.StringUtil;

public class SiteMapCreator
{
   private static final Comparator<Path> fileComparator = (a, b) ->
   {
      final int aFirst = -1;
      final int bFirst = 1;
      //files first
      if (Files.isRegularFile(a) && Files.isDirectory(b)) return aFirst;
      if (Files.isDirectory(a) && Files.isRegularFile(b)) return bFirst;

      //there can be only 1 index.html at a time
      if (a.toFile().getName().equals("index.html")) return aFirst;
      if (b.toFile().getName().equals("index.html")) return bFirst;

      return a.compareTo(b);
   };

   public static void generate()
   {
      final int rootPathOffset = Main.rootFolder.toPath().toAbsolutePath().normalize().toFile().getAbsolutePath().length() + 1;
      final List<Path> foldersToIgnore = Stream.of(".git", "java", "secret-origins/javascript", "secret-origins/js", "secret-origins/xml")
                                               .map(name -> Paths.get("..", name))
                                               .map(path -> path.toAbsolutePath().normalize())
                                               .collect(Collectors.toList());
      final List<Path> filesToIgnore = Stream.of("index.html", "site-map.html", "site-map2.html", "bash-site-map.html")
                                             .map(name -> Paths.get("..", name))
                                             .map(path -> path.toAbsolutePath().normalize())
                                             .collect(Collectors.toList());
      final List<Path> allHtml = new FileGatherer().withRootFolder(Main.rootFolder.toPath().toAbsolutePath().normalize())
                                                   .withPathOrder(fileComparator)
                                                   .withExploreCriteria(path -> !foldersToIgnore.contains(path))
                                                   .search()
                                                   .filter(FileGatherer.Filters.acceptExtensions("html"))
                                                   .map(path -> path.toAbsolutePath().normalize())
                                                   .collect(Collectors.toList());
      allHtml.removeAll(filesToIgnore);
      String previousLink = null;
      for (final Path input : allHtml)
      {
         final String link = input.toString().substring(rootPathOffset).replace("\\", "/");
         //TODO: use less String
         if (previousLink != null) printUnorderedListTags(link, previousLink);

         //TODO: use nameCount
         int depth = StringUtil.countCharOccurrences(link, '/');
         if (link.endsWith("index.html")) --depth;
         if (depth > 0) System.out.print("<li>");
         System.out.print("<a href=\"" + link + "\">");
         System.out.print(readTitle(input) + " (" + link + ")");
         System.out.print("</a>");
         if (depth == 0) System.out.println("<br />");
         else System.out.println("</li>");

         previousLink = link;
      }
      //TODO: make not fake
      printUnorderedListTags("fake", previousLink);
   }

   private static String readTitle(final Path input)
   {
      final String contents = FileIoUtil.readTextFile(input.toFile());
      final Matcher matcher = Pattern.compile("<title>(.+?) - Humans &amp; Heroes").matcher(contents);
      matcher.find();
      return matcher.group(1);
   }

   private static void printUnorderedListTags(final String destinationPath, final String previousLink)
   {
      //TODO: use Path instead of File
      File destinationFile = new File("./" + destinationPath);
      if (destinationPath.endsWith("index.html"))
      {
         destinationFile = destinationFile.getParentFile();
      }
      File previousFile = new File("./" + previousLink);
      if (previousFile.toString().endsWith("index.html"))
      {
         previousFile = previousFile.getParentFile();
      }
      final String linkBetween = FileMover.linkBetween(previousFile, destinationFile);
      //TODO: somehow use nameCount
      final String output = linkBetween.replaceAll("[^\\w./]", "")
                                       .replaceFirst("/?[^/]*$", "")
                                       .replaceAll("\\w+", "<ul>")
                                       .replace("/", "")
                                       .replaceAll("\\.\\.", "</ul>");
      if (!output.isEmpty()) System.out.println(output);
   }

}
