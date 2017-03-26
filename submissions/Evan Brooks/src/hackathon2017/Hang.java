package hackathon2017;

import java.util.Scanner;

public class Hang 
{
	private Scanner input = new Scanner(System.in);
	private char[] word;
	private char[] display;
	private char[] freeGuess;
	private char[] hangGuess;
	private Score score = new Score();
	private int right;
	
	Hang()
	{
		right = 0;
	}
	
	public void setWord()
	{
		System.out.println("Input word to guess: ");
		String temp = input.next();
		word = temp.toCharArray();
		display = new char[word.length];
		freeGuess = new char[word.length];
		hangGuess = new char[word.length];
		for (int i = 0; i < word.length; i++ )
		{
			display[i] = '_';
		}
	}
	
	public boolean freeGuess()
	{
		System.out.println("Free input guess: ");
		char temp = input.next().charAt(0);
		boolean in = false;
		for (int i = 0; i < word.length; i++)
		{
			if (temp == word[i])
			{
				display[i] = temp;
				in = true;
			}
		}
		System.out.println("done loop");
		if (!in)
		{
			score.freeWrong();
			System.out.println("Incorrect Guess");
			Hang.printHangman(score.getScore());
			System.out.println(score.toString());
			
			return false;
		}
		else
		{
			System.out.println("correct answer");
			Hang.printHangman(score.getScore());
			System.out.println(Hang.displayArray(display));
			if (!Hang.checkGuess(temp, freeGuess))
			{
				freeGuess[right] = temp;
				right++;
			}
			if (Hang.checkWord(word, display))
			{
				score.freeWin();
			}
			return true;
		}
		
	}
	
	private static boolean checkGuess(char temp, char[] freeGuess2) {
		for (int i = 0; i < freeGuess2.length; i++)
		{
			if ( temp == freeGuess2[i])
			{
				return true;
			}
		}
		return false;
	}

	private static String displayArray(char[] display) 
	{
		String temp = new String();
		for (int i = 0; i < display.length;i++)
		{
			temp += display[i];
		}
		return temp;
		
	}

	private static boolean checkWord(char[] wword, char[] ddisplay) {
		int i = 0;
		while(i < wword.length)
		{
			if(wword[i] != ddisplay[i])
			{
				return false;
			}
			i++;
		}
		return true;
	}

	public boolean checkWinLoss()
	{
		return (score.checkFree() || score.checkHang());
	}

	public void hangGuess() 
	{
		System.out.println("Hang input guess: ");
		char temp = input.next().charAt(0);
		boolean in = false;
		int i = 0;
		while (i < freeGuess.length && !in)
		{
			if (temp == freeGuess[i])
			{
				in = true;
				int j = 0;
				boolean guessed = false;
				while (j < hangGuess.length && !guessed)
				{
					if (temp == hangGuess[j])
					{
						guessed = true;
					}
					j++;
				}
				if(in && !guessed)
				{
					score.freeWrong();
					System.out.println("Correct guess");
					Hang.printHangman(score.getScore());
					System.out.println(score.toString());
					return;
				}
				else
				{
					System.out.println("already guessed");
					return;
				}
				
			}
			i++;
			
		}
		System.out.println("incorrect guess");
		Hang.printHangman(score.getScore());
		
	}
	
	public static void printHangman(int score)
	{
		String s1  = new String("     _____        ");
		String s2  = new String("    /     |       ");
		String s3  = new String("   /      O       ");
		String s4  = new String("  /               ");
		String s5  = new String(" /               ");
		String s6  = new String(" |                ");
		String s7  = new String(" |                ");
		String s8  = new String(" |                ");
		String s9  = new String(" |--------------| ");
		String s10 = new String(" |              | ");
		
		if(score == 1)
		{
			s4 = "  /       |       ";
			s5 = " /        |       ";
		}
		else if(score == 2)
		{
			s4 = "  /       |\\      ";
			s5 = " /        |       ";
		}
		else if (score == 3)
		{
			s4 = "  /      /|\\      ";
			s5 = " /        |       ";
		}
		else if (score == 4)
		{
			s4 = "  /      /|\\      ";
			s5 = " /        |       ";
			s6 = " |        /        ";
		}
		else if (score == 5)
		{
			s4 = "  /      /|\\      ";
			s5 = " /        |       ";
			s6 = " |        /\\       ";
		}
		
		System.out.println(s1);
		System.out.println(s2);
		System.out.println(s3);
		System.out.println(s4);
		System.out.println(s5);
		System.out.println(s6);
		System.out.println(s7);
		System.out.println(s8);
		System.out.println(s9);
		System.out.println(s10);
	}
	
}
