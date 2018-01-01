package com.github.SkySpiral7.HumansAndHeroes;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import com.github.skySpiral7.java.pojo.FileGatherer;
import com.github.skySpiral7.java.util.FileIoUtil;

public class SiteMapCreator
{
   private static final Comparator<Path> PATH_COMPARATOR = (a, b) ->
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
      final List<Path> foldersToIgnore = Stream.of(".git", "java", "secret-origins/javascript", "secret-origins/js", "secret-origins/xml")
                                               .map(name -> Paths.get("..", name))
                                               .map(path -> path.toAbsolutePath().normalize())
                                               .collect(Collectors.toList());
      final List<Path> filesToIgnore = Stream.of("index.html", "site-map.html")
                                             .map(name -> Paths.get("..", name))
                                             .map(path -> path.toAbsolutePath().normalize())
                                             .collect(Collectors.toList());
      final List<Path> allHtml = new FileGatherer().withRootFolder(Main.rootFolder.toPath().toAbsolutePath().normalize())
                                                   .withPathOrder(PATH_COMPARATOR)
                                                   .withExploreCriteria(path -> !foldersToIgnore.contains(path))
                                                   .search()
                                                   .filter(FileGatherer.Filters.acceptExtensions("html"))
                                                   .map(path -> path.toAbsolutePath().normalize())
                                                   .collect(Collectors.toList());
      allHtml.removeAll(filesToIgnore);
      final int rootPathOffset = Main.rootFolder.toPath().toAbsolutePath().normalize().toFile().getAbsolutePath().length() + 1;
      final int rootNameCount = Main.rootFolder.toPath().toAbsolutePath().normalize().getNameCount();
      int previousNameCount = rootNameCount;
      for (final Path input : allHtml)
      {
         final String link = input.toString().substring(rootPathOffset).replace("\\", "/");
         int currentNameCount = input.toAbsolutePath().normalize().getNameCount();
         if (link.endsWith("index.html")) --currentNameCount;

         printUnorderedListTags(currentNameCount - previousNameCount, link.endsWith("index.html"));

         if (currentNameCount != rootNameCount) System.out.print("<li>");
         System.out.print("<a href=\"" + link + "\">");
         System.out.print(readTitle(input) + " (" + link + ")");
         System.out.print("</a>");
         if (currentNameCount == rootNameCount) System.out.println("<br />");
         else if (!link.endsWith("index.html")) System.out.println("</li>");
         else System.out.println();

         previousNameCount = currentNameCount;
      }
      printUnorderedListTags(rootNameCount - previousNameCount, false);
   }

   private static String readTitle(final Path input)
   {
      final String contents = FileIoUtil.readTextFile(input.toFile());
      final Matcher matcher = Pattern.compile("<title>(.+?) - Humans &amp; Heroes").matcher(contents);
      matcher.find();  //this is always true but needs to be called before group
      return matcher.group(1);  //just let this throw if find returns false
   }

   private static void printUnorderedListTags(final int ulCount, final boolean isAnIndex)
   {
      if (ulCount == 0) return;
      final String[] arr = new String[Math.abs(ulCount)];
      if (ulCount > 0)
      {
         Arrays.fill(arr, "<li><ul>");
         System.out.println(String.join("", Arrays.asList(arr)).substring("<li>".length()));
      }
      else if (ulCount < 0)
      {
         Arrays.fill(arr, "</ul></li>");
         System.out.println(String.join("", Arrays.asList(arr)));
      }
   }
}
