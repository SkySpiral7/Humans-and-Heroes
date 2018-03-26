package com.github.SkySpiral7.HumansAndHeroes;

import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.ArrayDeque;
import java.util.Arrays;
import java.util.Deque;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

import com.github.skySpiral7.java.util.FileIoUtil;

public class UnlinkedFileDetector
{
   private static final File homePage = new File("../index.html");

   /**
    * Prints out any html file that doesn't have a hyperlink to get to it.
    */
   public static void detect()
   {
      final List<String> hiddenFiles = Arrays.stream(Main.getAllHtmlFiles())
                                             .map(input -> input.toPath().toAbsolutePath().normalize().toFile().getAbsolutePath())
                                             .sorted()
                                             .collect(Collectors.toList());
      hiddenFiles.removeAll(findAllLinkedFiles());

      System.out.println();
      System.out.println("Unlinked files:");
      hiddenFiles.forEach(Main::printFilePath);
   }

   private static Set<String> findAllLinkedFiles()
   {
      final Set<String> linkedFiles = new HashSet<>();
      final Deque<String> unexaminedFiles = new ArrayDeque<>();
      unexaminedFiles.add(homePage.toPath().toAbsolutePath().normalize().toFile().getAbsolutePath());

      System.out.print("Looking at ");
      Main.printFilePath(Main.sideBar);
      unexaminedFiles.addAll(readSideBar());

      while (!unexaminedFiles.isEmpty())
      {
         final String currentFile = unexaminedFiles.removeLast();
         System.out.print("Looking at ");
         Main.printFilePath(currentFile);
         linkedFiles.add(currentFile);

         final Set<String> links = readLinks(new File(currentFile));
         links.removeAll(linkedFiles);  //remove files that are already done
         links.removeAll(unexaminedFiles);  //remove files that are already pending

         unexaminedFiles.addAll(links);  //need to examine any new files
      }
      return linkedFiles;
   }

   private static Set<String> readSideBar()
   {
      final Set<String> results = new HashSet<>();
      for (final String pathToFile : Main.getAllSideBarLinks())
      {
         final File linkedFile = Paths.get(Main.rootFolder.getAbsolutePath(), pathToFile).normalize().toFile();
         results.add(linkedFile.getAbsolutePath());
      }
      return results;
   }

   private static Set<String> readLinks(final File currentFile)
   {
      final Set<String> results = new HashSet<>();
      DeadLinkDetector.findAllLocalLinks(currentFile).forEach(linkText ->
      {
         if (!linkText.startsWith("href=\"#"))
         {
            final String pathToFile = linkText.replaceFirst("^(?:src|href)=\"([^\"#?]+).*\"$", "$1");
            final File linkedFile = Paths.get(currentFile.getParentFile().getAbsolutePath(), pathToFile).normalize().toFile();
            if (linkedFile.toString().endsWith(".html")) results.add(linkedFile.getAbsolutePath());
         }
      });
      return results;
   }

}
