package com.github.SkySpiral7.HumansAndHeroes;

import java.io.File;
import java.util.Arrays;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.github.SkySpiral7.Java.util.FileIoUtil;

public class FlatSiteMapCreator
{
   public static void generate()
   {
      final int rootPathOffset = Main.rootFolder.toPath().toAbsolutePath().normalize().toFile().getAbsolutePath().length() + 1;
      final List<File> filesToIgnore = Arrays.asList(new File("../index.html"), new File("../site-map.html"),
            new File("../bash-site-map.html"));
      final List<File> allHtmlFiles = Arrays.asList(Main.getAllHtmlFiles());
      allHtmlFiles.removeAll(filesToIgnore);
      allHtmlFiles.forEach(file -> getFileConsumer(rootPathOffset, file));
   }

   private static void getFileConsumer(final int rootPathOffset, final File file)
   {
      final String absolutePath = file.toPath().toAbsolutePath().normalize().toFile().toString();
      final String link = absolutePath.substring(rootPathOffset).replace("\\", "/");
      System.out.print("<a href=\"" + link + "\">");
      System.out.print(readTitle(file) + " (" + link + ")");
      System.out.print("</a>");
      System.out.println("<br />");
   }

   private static String readTitle(final File input)
   {
      final String contents = FileIoUtil.readTextFile(input);
      final Matcher matcher = Pattern.compile("<title>(.+?) - Humans &amp; Heroes").matcher(contents);
      matcher.find();  //this is always true but needs to be called before group
      return matcher.group(1);  //just let this throw if find returns false
   }

}
