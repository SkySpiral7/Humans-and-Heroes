package com.github.SkySpiral7.HumansAndHeroes;

import java.io.File;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Scanner;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.github.skySpiral7.java.pojo.FileGatherer;
import com.github.skySpiral7.java.util.FileIoUtil;
import com.github.skySpiral7.java.util.StringUtil;

/**
 * Excuse the mess: I wrote this a long time ago.
 */
public class Main
{
   public static final File rootFolder = new File("..");
   public static final File sideBar = new File("../themes/sideBar.js");
   public static String rootFolderPath;

   private enum RunCommands
   {
      DEAD, UNLINKED, MOVE, MAP
   }

   public static void main(String[] args) throws Exception
   {
      rootFolderPath = Main.rootFolder.toPath().toAbsolutePath().normalize().toFile().getAbsolutePath();
      if (args.length == 0)
      {
         UnlinkedFileDetector.detect();
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
            SiteMapCreator.writeToTextFile();
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

   private static void writeToFiles()
   {
      for (File currentFile : getAllHtmlFiles())
      {
         String originalContents = FileIoUtil.readTextFile(currentFile);
         String newContents = originalContents;

         final Matcher matcher = Pattern.compile("<div class=\"col-12 col-md-3 col-xl-2 sites-layout-sidebar-left\">\n"
                                                 + "<script type=\"text/javascript\" src=\"((?:\\.\\./?)*)/themes/"
                                                 + "sideBar\\.js\"></script>\n" + "</div>").matcher(newContents);
         while (matcher.find())
         {
            final String oldWholeText = matcher.group(0);
            final String toRoot = matcher.group(1);
            final String newWholeText = "<div class=\"col-12 col-md-3 col-xl-2 sites-layout-sidebar-left\">\n"
                                        + "<p>Please enable JavaScript in order to see the generated sidebar.\n"
                                        + "Without it you'll have to use the <a href=\"" + toRoot + "/site-map.html\">sitemap</a> in "
                                        + "order easily navigate.</p>\n" + "\n"
                                        + "<p>sideBar.js is harmless: it simply generates hyperlinks to major pages. It exists in a "
                                        + "single place so that\n"
                                        + "I don't have to update 100+ html pages with relative links whenever I want to change it.</p>\n"
                                        + "</div>\n" + "<script type=\"text/javascript\" src=\"" + toRoot
                                        + "/themes/sideBar.js\"></script>";
            newContents = StringUtil.literalReplaceFirst(newContents, oldWholeText, newWholeText);
         }

         if (!newContents.equals(originalContents))
         {
            FileIoUtil.writeToFile(currentFile, newContents);
            System.out.print("Changed: ");
         }
         else System.out.print("Same: ");
         printFilePath(currentFile);
      }
      System.out.println("Done.");
   }

   //private static final List<String> titleCaseBlackList = Arrays.asList("a", "an", "and", "the", "of", "in", "to");
   private static final List<String> titleCaseCapsList = Arrays.asList("npc", "gm", "dc", "hp", "pc", "pl");

   private static String toTitleCase(final String original)
   {
      final String[] split = original.toLowerCase().split(" ");
      for (int i = 0; i < split.length; i++)
      {
         //if (i != 0 && titleCaseBlackList.contains(split[i])) continue;
         if (split[i].length() < 2) continue;
         else if (titleCaseCapsList.contains(split[i]) || StringUtil.regexFoundInString(split[i], "^pl\\d"))
            split[i] = split[i].toUpperCase();
         else if (split[i].equals("3df")) split[i] = "3dF";
         else if (split[i].substring(0, 1).equals("(")) split[i] = "(" + split[i].substring(1, 2).toUpperCase() + split[i].substring(2);
         else split[i] = split[i].substring(0, 1).toUpperCase() + split[i].substring(1);
      }
      return String.join(" ", split);
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

   private static void searchForText(String searchingFor, boolean ignoreCase, boolean removeTags)
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

   private static void advancedSearch()
   {
      final List<String> capsBlackList = Arrays.asList("DOCTYPE", "UTF-8", "SRD", "NPC", "SCUBA", "GPS", "GURPS", "SUV", "DNA", "MPH",
            "-AP-", "BY-SA", "SWAT", "APC", "RPG", "AIDS");
      for (File thisFile : getAllHtmlFiles())
      {
         final String fileContents = FileIoUtil.readTextFile(thisFile);
         final Matcher matcher = Pattern.compile("[\\w-]{3,}").matcher(fileContents);
         //use .+ and check if thing is in href or id
         boolean hasPrintedFileName = false;
         while (matcher.find())
         {
            final String capsText = matcher.group();
            if (capsBlackList.contains(capsText) || capsText.startsWith("TOC-") || !capsText.equals(capsText.toUpperCase())
                || StringUtil.regexFoundInString(capsText, "^(-|\\d|\\.)+$") || StringUtil.regexFoundInString(capsText, "^PL\\d")) continue;
            if (!hasPrintedFileName)
            {
               printFilePath(thisFile);
               hasPrintedFileName = true;
            }
            System.out.println("   " + capsText);
         }
      }
   }

   /**
    * I'd like to use HTML entities with ASCII. The HTML meta is UTF-8 but this method finds ones that aren't ASCII.
    */
   private static void searchForSymbols()
   {
      File[] myFileArray = getAllHtmlFiles();
      //		FileGatherer.Builder builder = new FileGatherer.Builder();
      //		builder.subFolderCriteria((File file)->{
      //			if(file.equals(new File("../.git"))) return false;
      //			if(file.equals(new File("../images"))) return false;
      //			return true;
      //		});
      //		builder.fileCriteria((File file)->{
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
            if (newContents.charAt(j) == '\r' || newContents.charAt(j) == '\n'){}  //there's also \t but I want that to be flagged
            else if (newContents.charAt(j) > '~' || newContents.charAt(j) < ' ')
            {
               results.add(newContents.charAt(j) + " = " + newContents.codePointAt(j));
               System.out.println(
                     myFileArray[i].getAbsolutePath() + " on line " + lineCount + " column " + colCount + " (length " + j + ") has "
                     + newContents.charAt(j) + " = " + newContents.codePointAt(j));
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
      return FileGatherer.searchForExtensions(containingFolder.toPath(), "html").map(Path::toFile).toArray(File[]::new);
   }

   public static List<String> getAllSideBarLinks()
   {
      final List<String> results = new ArrayList<>();
      final String contents = FileIoUtil.readTextFile(Main.sideBar);
      final Matcher matcher = Pattern.compile("\"?link\"?:\\s*\"([^\"]+)\"").matcher(contents);
      while (matcher.find())
      {
         results.add(matcher.group(1));
      }
      return results;
   }
}
