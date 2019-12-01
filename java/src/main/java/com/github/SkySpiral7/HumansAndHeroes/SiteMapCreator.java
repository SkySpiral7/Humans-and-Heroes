package com.github.SkySpiral7.HumansAndHeroes;

import java.io.File;
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
   private static final Comparator<Path> PATH_COMPARATOR = (a, b) -> {
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

   public static void writeToTextFile()
   {
      final List<String> blackList = Arrays.asList("/google122b9bf962559bcf.html", "/index.html");
      final StringBuilder stringBuilder = new StringBuilder();
      Arrays.stream(Main.getAllHtmlFiles())
            .map(file -> {
               //more advanced: could make an xml sitemap and ask git for last updated: git log -1 --format="%aI" -- :/$filepath
               final String outputAbsolutePath = file.toPath().toAbsolutePath().normalize().toFile().getAbsolutePath();
               final String outputRelativePath = outputAbsolutePath.replace(Main.rootFolderPath, "");
               return outputRelativePath;
            })
            .filter(path -> !blackList.contains(path))
            .forEach(path -> stringBuilder.append("http://skyspiral7.github.io/Humans-and-Heroes").append(path).append('\n'));
      FileIoUtil.writeToFile(new File("../sitemap.txt"), stringBuilder.toString());
   }

   public static void generate()
   {
      final List<Path> foldersToIgnore = Stream.of(".git", "java", "secret-origins/javascript", "secret-origins/js", "secret-origins/xml")
                                               .map(name -> Paths.get("..", name))
                                               .map(path -> path.toAbsolutePath().normalize())
                                               .collect(Collectors.toList());
      final List<Path> filesToIgnore = Stream.of("google122b9bf962559bcf.html", "index.html", "site-map.html")
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
      final StringBuilder stringBuilder = new StringBuilder(15000);
      for (final Path input : allHtml)
      {
         final String link = input.toString().substring(rootPathOffset).replace("\\", "/");
         int currentNameCount = input.toAbsolutePath().normalize().getNameCount();
         if (link.endsWith("index.html")) --currentNameCount;

         stringBuilder.append(printUnorderedListTags(currentNameCount - previousNameCount));

         if (currentNameCount != rootNameCount) stringBuilder.append("<li>");
         stringBuilder.append("<a href=\"").append(link).append("\">");
         stringBuilder.append(readTitle(input)).append(" (").append(link).append(")");
         stringBuilder.append("</a>");
         if (currentNameCount == rootNameCount) stringBuilder.append("<br />\n");
         else if (!link.endsWith("index.html")) stringBuilder.append("</li>\n");
         else stringBuilder.append('\n');

         previousNameCount = currentNameCount;
      }
      stringBuilder.append(printUnorderedListTags(rootNameCount - previousNameCount + 1));
      stringBuilder.append("</ul>\n");
      String siteMap = stringBuilder.toString();
      siteMap = siteMap.replaceFirst("<ul>", "<ul class=\"tree\">");
      System.out.print(siteMap);
   }

   private static String readTitle(final Path input)
   {
      final String contents = FileIoUtil.readTextFile(input.toFile());
      final Matcher matcher = Pattern.compile("<title>(.+?) - Humans &amp; Heroes").matcher(contents);
      if (!matcher.find()) throw new AssertionError("HTML without title: " + input);
      //matcher.find is always true but needs to be called before group
      return matcher.group(1);
   }

   private static String printUnorderedListTags(final int ulCount)
   {
      if (ulCount == 0) return "";
      final String[] arr = new String[Math.abs(ulCount)];
      if (ulCount > 0)
      {
         Arrays.fill(arr, "<li><ul>");
         return String.join("", Arrays.asList(arr)).substring("<li>".length()) + "\n";
      }
      else //if (ulCount < 0)
      {
         Arrays.fill(arr, "</ul></li>");
         return String.join("", Arrays.asList(arr)) + "\n";
      }
   }
}
