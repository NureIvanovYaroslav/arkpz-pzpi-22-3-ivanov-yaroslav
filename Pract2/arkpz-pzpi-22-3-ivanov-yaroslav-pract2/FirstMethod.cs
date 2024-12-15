//До рефакторингу
using System;

class Program
{
    static void Main(string[] args)
    {
        string[][] games = new string[3][];
        
        games[0] = new string[] { "The Witcher 3", "9.5", "2015", "40000000" };
        games[1] = new string[] { "Cyberpunk 2077", "7.8", "2020", "20000000" };
        games[2] = new string[] { "Red Dead Redemption 2", "9.8", "2018", "50000000" };
        
        Array.Sort(games, (a, b) => double.Parse(b[1]).CompareTo(double.Parse(a[1])));
        
        Console.WriteLine("Ігри за середніми оцінками (від найвищої):");
        foreach (var game in games)
        {
            Console.WriteLine($"Назва: {game[0]}, Середня оцінка: {game[1]}, Рік випуску: {game[2]}, Продані копії: {game[3]}");
        }
    }
}

//Після рефакторингу
using System;
using System.Collections.Generic;
using System.Linq;

class Game
{
    public string Name { get; set; }
    public double AverageRating { get; set; }
    public int ReleaseYear { get; set; }
    public long CopiesSold { get; set; }

    public Game(string name, double averageRating, int releaseYear, long copiesSold)
    {
        Name = name;
        AverageRating = averageRating;
        ReleaseYear = releaseYear;
        CopiesSold = copiesSold;
    }

    public override string ToString()
    {
        return $"Назва: {Name}, Середня оцінка: {AverageRating}, Рік випуску: {ReleaseYear}, Продані копії: {CopiesSold}";
    }
}

class Program
{
    static void Main(string[] args)
    {
        List<Game> games = new List<Game>
        {
            new Game("The Witcher 3", 9.5, 2015, 40000000),
            new Game("Cyberpunk 2077", 7.8, 2020, 20000000),
            new Game("Red Dead Redemption 2", 9.8, 2018, 50000000)
        };

        var sortedGames = games.OrderByDescending(game => game.AverageRating).ToList();

        Console.WriteLine("Ігри за середніми оцінками (від найвищої):");
        foreach (var game in sortedGames)
        {
            Console.WriteLine(game);
        }
    }
}