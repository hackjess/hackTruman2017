package hackathon2017;

public class Score 
{
	private final int MAX_WRONG = 5;
	private int wrong;
	private boolean freeWin;
	private boolean hangWin;
	
	Score()
	{
		freeWin = false;
		hangWin = false;
		wrong = 0;
	}
	
	public boolean checkFree()
	{
		return freeWin;
	}
	
	public boolean checkHang()
	{
		return hangWin;
	}
	
	public void freeWrong()
	{
		wrong++;
		if (wrong == MAX_WRONG)
		{
			Score.hangWin();
			hangWin = true;
		}
	}

	private static void hangWin() {
		System.out.println("Hang won!");
		
	}

	public void freeWin() 
	{
		freeWin = true;
		System.out.println("Free has won!");
		
	}
	
	public int getScore()
	{
		return wrong;
	}
	
	public String toString()
	{
		return "Free has missed" + wrong + " out of " + MAX_WRONG;
		
	}
}
