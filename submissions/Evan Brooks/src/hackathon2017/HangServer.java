package hackathon2017;


public class HangServer 
{

	public static void main(String[] args) 
	{
		Hang game = new Hang();
		game.setWord();
		
		while(!game.checkWinLoss())
		{
			while(game.freeGuess() && !game.checkWinLoss()){}
			if (!game.checkWinLoss())
			{
				game.hangGuess();
			}
		}
		

		
	}

}
