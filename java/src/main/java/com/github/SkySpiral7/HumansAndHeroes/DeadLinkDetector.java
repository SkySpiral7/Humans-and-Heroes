package com.github.SkySpiral7.HumansAndHeroes;

import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.HashSet;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

import com.github.skySpiral7.java.util.FileIoUtil;
import com.github.skySpiral7.java.util.StringUtil;

public class DeadLinkDetector
{
   //static state? ew. TODO: refactor
   private static boolean hasDeadLinks = false;

   /**
    * Prints out each broken hyperlink (ones that are 404).
    */
   public static void detect()
   {
      for (final File currentFile : Main.getAllHtmlFiles())
      {
         System.out.print("Looking at ");
         Main.printFilePath(currentFile);
         readLinks(currentFile);
      }
      System.out.print("Looking at ");
      Main.printFilePath(Main.sideBar);
      readSideBar();
      if(!hasDeadLinks) System.out.println("No dead links.");
   }

   private static void readSideBar()
   {
      for (final String pathToFile : Main.getAllSideBarLinks())
      {
         final File linkedFile = Paths.get(Main.rootFolder.getAbsolutePath(), pathToFile).toFile();
         if (!linkedFile.exists()){System.out.println("   Broken link to: " + pathToFile); hasDeadLinks=true;}
      }
   }

   private static void readLinks(final File currentFile)
   {
      findAllLocalLinks(currentFile).forEach(linkText ->
      {
         if (linkText.startsWith("href=\"#"))
         {
            final String contents = FileIoUtil.readTextFile(currentFile);
            final String anchor = linkText.replaceFirst("^href=\"#([^\"]+)\"$", "$1");
            if (!contents.contains("id=\"" + anchor + "\"")){System.out.println("   Broken link to: #" + anchor); hasDeadLinks=true;}
         }
         else
         {
            final String pathToFile = linkText.replaceFirst("^(?:src|href)=\"([^\"#?]+).*\"$", "$1");
            final File linkedFile = Paths.get(currentFile.getParentFile().getAbsolutePath(), pathToFile).toFile();
            if (!linkedFile.exists()){System.out.println("   Broken link to: " + pathToFile); hasDeadLinks=true;}
            else if (linkText.contains("#"))
            {
               final String contents = FileIoUtil.readTextFile(linkedFile);
               final String anchor = linkText.replaceFirst("^href=\"[^\"#]+#([^\"]+)\"$", "$1");
               if (!contents.contains("id=\"" + anchor + "\"")){System.out.println("   Broken link to: " + pathToFile + "#" + anchor); hasDeadLinks=true;}
            }
         }
      });
   }

   public static Set<String> findAllLinks(final File currentFile)
   {
      final String contents = FileIoUtil.readTextFile(currentFile).replaceAll("<!--[\\s\\S]*?-->", "");
      final Matcher matcher = Pattern.compile("(?:src|href)=\"[^\"]+\"").matcher(contents);
      final Set<String> linkSet = new HashSet<>();
      while (matcher.find())
      {
         linkSet.add(matcher.group());
      }
      return linkSet;
   }

   public static Set<String> findAllLocalLinks(final File currentFile)
   {
      return findAllLinks(currentFile).stream().filter(linkText ->
            !StringUtil.regexFoundInString(linkText, "^(?:src|href)=\"(?:https?|mailto|javascript|data):")
      ).collect(Collectors.toSet());
   }

}
