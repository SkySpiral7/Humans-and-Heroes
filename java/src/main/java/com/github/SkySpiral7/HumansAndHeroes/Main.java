package com.github.SkySpiral7.HumansAndHeroes;

import com.github.SkySpiral7.Java.pojo.FileGatherer;
import com.github.SkySpiral7.Java.util.FileIoUtil;
import com.github.SkySpiral7.Java.util.StringUtil;
import com.sun.org.apache.xpath.internal.SourceTree;

import java.io.File;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Scanner;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Excuse the mess: I wrote this a long time ago.
 */
public class Main
{
   public static final File rootFolder = new File("..");
   public static final File sideBar = new File("../themes/sideBar.js");
   private static String rootFolderPath;

   private enum RunCommands{DEAD, UNLINKED, MOVE, MAP}

   public static void main(String[] args) throws Exception
   {
      rootFolderPath = Main.rootFolder.toPath().toAbsolutePath().normalize().toFile().getAbsolutePath();
      if (args.length == 0)
      {
         advancedSearch();
         return;
      }
      switch (RunCommands.valueOf(args[0].toUpperCase()))
      {
         case DEAD:
            DeadLinkDetector.detect();
            break;
         case UNLINKED:
            UnlinkedFileDetector.detect();
            break;
         case MOVE:
            final String oldPath = "../" + args[1];
            final String newPath = "../" + args[2];
            FileMover.moveFile(new File(oldPath), new File(newPath));
            break;
         case MAP:
            SiteMapCreator.generate();
            break;
      }
   }

   public static void printFilePath(final File file)
   {
      final String outputAbsolutePath = file.toPath().toAbsolutePath().normalize().toFile().getAbsolutePath();
      System.out.println(outputAbsolutePath.replace(rootFolderPath, ""));
   }

   public static void printFilePath(final String filePath)
   {
      printFilePath(new File(filePath));
   }

   public static void writeToFiles()
   {
      for (File currentFile : getAllHtmlFiles(new File("../powers/effects/"))) {
         String originalContents = FileIoUtil.readTextFile(currentFile);
         String newContents = originalContents;

         newContents = StringUtil.literalReplaceAll(newContents," class=\"black-header\"", "");

         if (!newContents.equals(originalContents)) {
            FileIoUtil.writeToFile(currentFile, newContents);
            System.out.print("Changed: ");
         } else System.out.print("Same: ");
         printFilePath(currentFile);
      }
      System.out.println("Done.");
   }

   /**
    * Use this again when the html is cleaned up from all generated and css stuff
    */
   public static String lineMax(String contentsToChange)
   {
      Scanner scanner;
      StringBuilder returnValue = new StringBuilder();
      scanner = new Scanner(contentsToChange);
      while (scanner.hasNextLine())
      {
         String line = scanner.nextLine();
         if (line.startsWith("<p>") || line.startsWith("<div style=\"padding:5px\">"))
         {
            while (line.length() > 120)
            {
               int lastSpaceIndex = line.lastIndexOf(' ', 120);
               if (lastSpaceIndex == -1) break;
               returnValue.append(line.substring(0, lastSpaceIndex)).append("\n");
               line = line.substring(lastSpaceIndex + 1);
            }
         }
         returnValue.append(line).append("\n");
      }
      scanner.close();
      return returnValue.toString();
   }

   public static void searchForText(String searchingFor, boolean ignoreCase, boolean removeTags)
   {
      File[] myFileArray = getAllHtmlFiles();
      List<File> foundList = new ArrayList<>();
      if (ignoreCase) searchingFor = searchingFor.toLowerCase();
      for (int i = 0; i < myFileArray.length; i++)
      {
         String contents = FileIoUtil.readTextFile(myFileArray[i]);
         if (removeTags) contents = contents.replaceAll("<[^>]+>", "");
         if (ignoreCase) contents = contents.toLowerCase();
         if (contents.contains(searchingFor)) foundList.add(myFileArray[i]);
      }
      if (foundList.isEmpty())
      {
         System.out.println("Not found.");
         return;
      }
      System.out.println("Results:");
      foundList.forEach(Main::printFilePath);
   }

   public static void advancedSearch()
   {
      final File[] allHtmlFiles = getAllHtmlFiles();
      final Set<String> classesFound = new HashSet<>();
      final Set<String> stylesFound = new HashSet<>();
      for (int i = 0; i < allHtmlFiles.length; i++)
      {
         final String fileContents = FileIoUtil.readTextFile(allHtmlFiles[i]);
         final Matcher headerMatcher = Pattern.compile("<h[1-6][^<]+</h[1-6]>").matcher(fileContents);
         while(headerMatcher.find())
         {
            final String headerTag = headerMatcher.group();
            final Matcher classMatcher = Pattern.compile("class=\"([^\"]+)\"").matcher(headerTag);
            if(classMatcher.find()) {
               classesFound.add(classMatcher.group(1));
            }
            final Matcher styleMatcher = Pattern.compile("style=\"([^\"]+)\"").matcher(headerTag);
            if(styleMatcher.find()) {
               stylesFound.add(styleMatcher.group(1));
            }
         }
      }

      System.out.println("Classes:");
      if (classesFound.isEmpty())
      {
         System.out.println("Not found.");
      }
      else classesFound.forEach(System.out::println);

      System.out.println();
      System.out.println("Styles:");
      if (stylesFound.isEmpty())
      {
         System.out.println("Not found.");
      }
      else stylesFound.forEach(System.out::println);
   }

   /**
    * I'd like to use HTML entities with ASCII. The HTML meta is UTF-8 but this method finds ones that aren't ASCII.
    */
   public static void searchForSymbols()
   {
      File[] myFileArray = getAllHtmlFiles();
      //		FileGatherer.Builder builder = new FileGatherer.Builder();
      //		builder.subFolderCriteria((File file)->{
      //			if(file.equals(new File("../.git"))) return false;
      //			if(file.equals(new File("../images"))) return false;
      //			return true;
      //		});
      //		builder.fileCriteria((File file)->{
      //			if(file.equals(new File("../themes/bg-pattern.gif"))) return false;
      //			if(file.equals(new File("../themes/bg-top.gif"))) return false;
      //			//if(file.equals(new File("../secret-origins/xml/Mewtwo.xml"))) return false;
      //			return true;
      //		});
      //		builder.rootFolder(rootFolder);
      //		File[] myFileArray = builder.build().search().toArray(new File[0]);
      Set<String> results = new HashSet<>();
      System.out.println("Searching...");
      for (int i = 0; i < myFileArray.length; i++)
      {
         int lineCount = 1, colCount = 0;
         String newContents = FileIoUtil.readTextFile(myFileArray[i]);
         for (int j = 0; j < newContents.length(); j++)
         {
            if (newContents.charAt(j) == '\n')
            {
               lineCount++;
               colCount = 0;
            }
            else colCount++;
            if (newContents.charAt(j) == '\r' || newContents.charAt(j) == '\n') {}  //there's also \t but I want that to be flagged
            else if (newContents.charAt(j) > '~' || newContents.charAt(j) < ' ')
            {
               results.add(newContents.charAt(j) + " = " + newContents.codePointAt(j));
               System.out.println(
                       myFileArray[i].getAbsolutePath() + " on line " + lineCount + " column " + colCount + " (length " + j + ") has " + newContents.charAt(j)
                               + " = " + newContents.codePointAt(j));
            }
         }
      }
      if (results.isEmpty())
      {
         System.out.println("All 7 bit ASCII (and on the keyboard).");
         return;
      }
      System.out.println("Results:");
      results.forEach(System.out::println);
   }

   public static File[] getAllHtmlFiles()
   {
      return getAllHtmlFiles(rootFolder);
   }

   public static File[] getAllHtmlFiles(final File containingFolder)
   {
      return FileGatherer.searchForFilesWithExtension(containingFolder, "html").toArray(new File[0]);
   }
}
