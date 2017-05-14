package com.github.SkySpiral7.HumansAndHeroes;

import com.github.SkySpiral7.Java.pojo.FileGatherer;
import com.github.SkySpiral7.Java.util.FileIoUtil;
import com.github.SkySpiral7.Java.util.StringUtil;

import java.io.File;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Scanner;
import java.util.Set;

/**
 * Excuse the mess: I wrote this a long time ago.
 */
public class Main
{
   public static final File rootFolder = new File("..");
   public static final File sideBar = new File("../themes/side bar.js");
   private static String rootFolderPath;

   private enum RunCommands{DEAD, UNLINKED, MOVE, MAP}

   public static void main(String[] args) throws Exception
   {
      rootFolderPath = Main.rootFolder.toPath().toAbsolutePath().normalize().toFile().getAbsolutePath();
      if (args.length == 0)
      {
         writeToFiles();
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

   public static void printFileOutput(final File output)
   {
      final String outputAbsolutePath = output.toPath().toAbsolutePath().normalize().toFile().getAbsolutePath();
      System.out.println(outputAbsolutePath.replace(rootFolderPath, ""));
   }

   public static void printFileOutput(final String fileOutput)
   {
      printFileOutput(new File(fileOutput));
   }

   public static void writeToFiles()
   {
      for (File currentFile : getAllHtmlFiles()) {
         String originalContents = FileIoUtil.readTextFile(currentFile);
         String newContents = StringUtil.literalReplaceFirst(originalContents,"<table class=\"table-body\">", "<table>");
         if (!newContents.equals(originalContents)) {
            FileIoUtil.writeToFile(currentFile, newContents);
            System.out.print("Changed: ");
         } else System.out.print("Same: ");
         System.out.println(currentFile.getAbsolutePath());
      }
      System.out.println("Done.\r\n");
   }

   /**
    * Use this again when the html is cleaned up from all generated and css stuff
    */
   public static String lineMax(String contentsToChange)
   {
      Scanner scanner;
      String returnValue = "";
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
               returnValue += line.substring(0, lastSpaceIndex) + "\r\n";
               line = line.substring(lastSpaceIndex + 1);
            }
         }
         returnValue += line + "\r\n";
      }
      scanner.close();
      return returnValue;
   }

   public static void searchForText(String searchingFor, boolean ignoreCase, boolean removeTags)
   {
      File[] myFileArray = getAllHtmlFiles();
      List<File> foundList = new ArrayList<>();
      List<File> remainingList = new ArrayList<>();
      if (ignoreCase) searchingFor = searchingFor.toLowerCase();
      for (int i = 0; i < myFileArray.length; i++)
      {
         String contents = FileIoUtil.readTextFile(myFileArray[i]);
         if (ignoreCase) contents = contents.toLowerCase();
         if (removeTags) contents = contents.replaceAll("<.*?>", "");
         if (contents.contains(searchingFor)) foundList.add(myFileArray[i]);
         else remainingList.add(myFileArray[i]);
      }
      System.out.println("Done.\r\n");
      if (foundList.isEmpty())
      {
         System.out.println("Not found.");
         return;
      }
      System.out.println("Results:");
      for (int i = 0; i < foundList.size(); i++)
      { System.out.println(foundList.get(i).getAbsolutePath()); }
      System.out.println("\nNot found in these files:");
      for (int i = 0; i < remainingList.size(); i++)
      { System.out.println(remainingList.get(i).getAbsolutePath()); }
   }

   public static void searchForRegex(String searchingFor)
   {
      File[] myFileArray = getAllHtmlFiles();
      List<File> results = new ArrayList<>();
      for (int i = 0; i < myFileArray.length; i++)
      {
         String contents = FileIoUtil.readTextFile(myFileArray[i]);
         if (StringUtil.regexFoundInString(contents, searchingFor)) results.add(myFileArray[i]);
      }
      System.out.println("Done.\r\n");
      if (results.isEmpty())
      {
         System.out.println("Not found.");
         return;
      }
      System.out.println("Results:");
      for (int i = 0; i < results.size(); i++)
      { System.out.println(results.get(i).getAbsolutePath()); }
   }

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
            if (newContents.charAt(j) == '\n' && newContents.charAt(j - 1) != '\r')
               System.out.println(myFileArray[i].getAbsolutePath() + " broken endline found on line " + lineCount + " (length " + j + ") has \\n alone");
            if (newContents.charAt(j) == '\r' && newContents.charAt(j + 1) != '\n')
               System.out.println(myFileArray[i].getAbsolutePath() + " broken endline found on line " + lineCount + " (length " + j + ") has \\r alone");
         }
      }
      System.out.println("Done.\r\n");
      if (results.isEmpty())
      {
         System.out.println("All 7 bit ASCII (and on the keyboard).");
         return;
      }
      System.out.println("Results:");
      for (String item : results) { System.out.println(item); }
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
