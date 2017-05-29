package com.github.SkySpiral7.HumansAndHeroes;

import com.github.SkySpiral7.Java.util.FileIoUtil;
import com.github.SkySpiral7.Java.util.StringUtil;

import java.io.File;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

/**
 * Excuse the mess: I wrote this a long time ago.
 */
public class CssChanger
{
   private static final File cssFile = new File("../themes/solitudecherry.css");

   public static void detectAllStyle()
   {
      File[] myFileArray = Main.getAllHtmlFiles();
      Set<String> results = new HashSet<>();

      for (int fileIndex = 0; fileIndex < myFileArray.length; fileIndex++)
      {
         String contents = FileIoUtil.readTextFile(myFileArray[fileIndex]);
         //contents=contents.replaceAll("\\s+", "").toLowerCase();
         String[] splitContents = contents.split("style=");
         for (int i = 1; i < splitContents.length; i++)
         {
            //skipping the first because I am only interested in what comes after style=
            String styleContents;  //only exists for readability
            styleContents = splitContents[i].substring(1, splitContents[i].indexOf('"', 1));
            results.add(styleContents);
         }
      }
      if (results.isEmpty())
      {
         System.out.println("None found.");
         return;
      }
      System.out.println("Results:");
      List<String> sortedResults = new ArrayList<>(results);
      Collections.sort(sortedResults);
      sortedResults.forEach(System.out::println);
   }

   public static void combineClasses()
   {
      File[] myFileArray = Main.getAllHtmlFiles();
      for (int fileIndex = 0; fileIndex < myFileArray.length; fileIndex++)
      {
         String contents = FileIoUtil.readTextFile(myFileArray[fileIndex]);
         String[] splitContents = contents.split("class=\"");
         StringBuilder strBuild = new StringBuilder();
         if(splitContents.length <= 1) continue;
         strBuild.append(splitContents[0]).append("class=\"");
         for (int i = 1; i < splitContents.length; i++)
         {
            String text = splitContents[i].substring(splitContents[i].indexOf('"') + 1);
            if (text.contains(">"))
            {
               strBuild.append(splitContents[i]);
               if (i < splitContents.length - 1) strBuild.append("class=\"");
            }
            else
            {
               strBuild.append(splitContents[i].substring(0, splitContents[i].indexOf('"')));
               strBuild.append(' ');
            }
         }
         Main.printFilePath(myFileArray[fileIndex]);
         FileIoUtil.writeToFile(myFileArray[fileIndex], strBuild.toString());
      }
      System.out.println("Done.");
   }

   public static void replaceStyleWithClass()
   {
      File[] myFileArray = Main.getAllHtmlFiles();
      Set<String> styleSet = new HashSet<>();
      final int offset = 10;

      for (int fileIndex = 0; fileIndex < myFileArray.length; fileIndex++)
      {
         String contents = FileIoUtil.readTextFile(myFileArray[fileIndex]);
         //contents=contents.replaceAll("\\s+", "").toLowerCase();
         String[] splitContents = contents.split("style=");
         for (int i = 1; i < splitContents.length; i++)
         {
            //skipping the first because I am only interested in what comes after style=
            String styleContents = splitContents[i].substring(1, splitContents[i].indexOf('"', 1));
            styleSet.add(styleContents);
         }
      }
      if (styleSet.isEmpty())
      {
         System.out.println("None found.");
         return;
      }
      System.out.println("Found them.");
      List<String> styleList = new ArrayList<>(styleSet);
      //shortest first
      styleList.sort(Comparator.comparingInt(String::length));
      for (Iterator<String> iterator = styleList.iterator(); iterator.hasNext(); )
      {
         String style = iterator.next();
         if (!style.endsWith(";")) style += ";";
         if (StringUtil.countCharOccurrences(style, ';') <= 3) iterator.remove();
      }
      System.out.println("Filtered them.");
      for (int i = 0; i < styleList.size(); i++)
      {
         String style = styleList.get(i).trim();
         if (style.endsWith(";")) style = style.replaceFirst(";$", "");
         style = style.replaceAll(": *", ": ");
         style = style.replaceAll("  +", " ");

         final List<String> stringList = Arrays.asList(style.split("; ?"));
         Collections.sort(stringList);
         style = String.join(";\n   ", stringList);

         style = "   " + style + ";\n";

         final String newClass = "\n.generated-class-" + (i + offset) + " {\n" +
                 style + "}\n";
         FileIoUtil.appendToFile(cssFile, newClass);
      }
      System.out.println("Done generating.");
      for (int fileIndex = 0; fileIndex < myFileArray.length; fileIndex++)
      {
         String contents = FileIoUtil.readTextFile(myFileArray[fileIndex]);
         for (int i = 0; i < styleList.size(); i++)
         {
            final String findText = "style=\"" + styleList.get(i) + '"';
            final String replaceText = "class=\"generated-class-" + (i + offset) + '"';
            contents = contents.replace(findText, replaceText);
         }
         FileIoUtil.writeToFile(myFileArray[fileIndex], contents);
         Main.printFilePath(myFileArray[fileIndex]);
      }
      System.out.println("Done.");
   }

   public static void removedUnusedCss()
   {
      Set<String> allCssNames = getAllCssClasses();

      if (allCssNames.isEmpty())
      {
         System.out.println("Error: Css not parsed.");
         return;
      }
      System.out.println("Done with css. Size: " + allCssNames.size());
      List<String> unusedCss = new ArrayList<>();
      int index = 0;
      for (String name : allCssNames)
      {
         index++;
         System.out.println("Searching: " + name + ". " + index + " / " + allCssNames.size());
         if (!searchHtmlForClass(name)) unusedCss.add(name);
      }

      if (unusedCss.isEmpty())
      {
         System.out.println("Got all them suckers");
         return;
      }
      System.out.println("Getting full names: " + unusedCss);
      Set<String> fullUnusedNames = getFullCssNames(unusedCss);
      System.out.println("Blotting out: " + fullUnusedNames);
      blotOutCss(fullUnusedNames);
      System.out.println("Done");
   }

   private static Set<String> getAllCssClasses()
   {
      String cssFileText = FileIoUtil.readTextFile(cssFile);
      Set<String> allCssNames = new HashSet<>();
      cssFileText = cssFileText.replaceAll("/\\*[\\s\\S]*?\\*/", "");  //remove all comments
      cssFileText = cssFileText.replaceAll("\\{[\\s\\S]*?\\}", "");  //remove all bodies
      cssFileText = cssFileText.replace(".", " .");  //make sure all dots have a space before them
      String[] cssSplit = cssFileText.split("[^a-zA-Z0-9_.-]+");  //split by everything that isn't a tag or class
      for (String splitItem : cssSplit)
      {
         if (splitItem.isEmpty()) continue;  //if there was multiple white space etc in a row
         if (splitItem.charAt(0) != '.') continue;  //not a class
         allCssNames.add(splitItem.substring(1));  //chop off dot
      }
      return allCssNames;
   }

   private static boolean searchHtmlForClass(String cssName)
   {
      File[] myFileArray = Main.getAllHtmlFiles();
      Pattern cssPattern = Pattern.compile("class=\" *(?:|[^\"]+ )\\Q" + cssName + "\\E *(?:| [^\"]+) *\"");
      for (int i = 0; i < myFileArray.length; i++)
      {
         String contents = FileIoUtil.readTextFile(myFileArray[i]);
         if (cssPattern.matcher(contents).find()) return true;
      }
      return false;
   }

   private static Set<String> getFullCssNames(Collection<String> cssNameList)
   {
      String cssFileText = FileIoUtil.readTextFile(cssFile);
      Set<String> fullCssNames = new HashSet<>();
      cssFileText = cssFileText.replaceAll("/\\*[\\s\\S]*?\\*/", "");  //remove all comments
      cssFileText = cssFileText.replaceAll("\\{[\\s\\S]*?\\}", "");  //remove all bodies
      String[] cssSplit = cssFileText.split("[,\n]");
      for (String splitItem : cssSplit)
      {
         splitItem = splitItem.trim();
         if (splitItem.isEmpty()) continue;  //if there was multiple white space etc in a row
         for (String nameItem : cssNameList)
         {
            if (Pattern.compile("\\." + nameItem.trim() + "[^a-zA-Z0-9_-]").matcher(splitItem).find()
                || Pattern.compile("\\." + nameItem.trim() + '$').matcher(splitItem).find())
            {
               fullCssNames.add(splitItem);
               break;
            }
         }
      }
      return fullCssNames;
   }

   private static void blotOutCss(Collection<String> cssNameList)
   {
      String cssFileText = FileIoUtil.readTextFile(cssFile);
      for (String cssName : cssNameList)
      {
         cssFileText = StringUtil.regexReplaceAll(cssFileText, Pattern.compile("(, *|^)\\Q" + cssName + "\\E( *,| *\\{$)", Pattern.MULTILINE), "$1$2");
      }
      cssFileText = cssFileText.replaceAll(" *,+", ",");  //delete multi commas
      cssFileText = cssFileText.replaceAll(", *\\{", " {");  //delete trailing commas (including ones I added)
      cssFileText = StringUtil.regexReplaceAll(cssFileText, Pattern.compile("^ *,", Pattern.MULTILINE), "");
      //delete leading commas. also deletes ones I added
      Pattern emptyBlockPattern = Pattern.compile("\\}\\s*\\{.*?\\}", Pattern.DOTALL);
      while (emptyBlockPattern.matcher(cssFileText).find())
      { cssFileText = StringUtil.regexReplaceAll(cssFileText, emptyBlockPattern, "}"); }
      //delete empty blocks (not first). needs a loop because replacement is used for match
      cssFileText = StringUtil.regexReplaceFirst(cssFileText, Pattern.compile("\\*/\\s*\\{.*?\\}", Pattern.DOTALL), "*/");
      //delete first block if empty
      FileIoUtil.writeToFile(cssFile, cssFileText);
   }

}
