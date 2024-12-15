//До рефакторингу
public class CheckerPiece
{
    public int PositionX { get; set; }
    public int PositionY { get; set; }
    public bool IsKing { get; set; }
    public bool IsCaptured { get; set; }

    public CheckerPiece(int x, int y, bool isKing)
    {
        PositionX = x;
        PositionY = y;
        IsKing = isKing;
        IsCaptured = false;
    }
}

public class Game
{
    private List<CheckerPiece> _allPieces;

    public Game(List<CheckerPiece> pieces)
    {
        _allPieces = pieces;
    }

    public int CalculateTurnScore(CheckerPiece piece, List<CheckerPiece> capturedPieces)
    {
        int baseScore = piece.IsKing ? 15 : 10;
        int capturedScore = CalculateCapturedPiecesScore(capturedPieces);
        return baseScore + capturedScore;
    }

    private int CalculateCapturedPiecesScore(List<CheckerPiece> capturedPieces)
    {
        return capturedPieces.Count * 5;
    }
}

//Після рефакторингу
public class CheckerPiece
{
    public int PositionX { get; set; }
    public int PositionY { get; set; }
    public bool IsKing { get; set; }
    public bool IsCaptured { get; set; }

    public CheckerPiece(int x, int y, bool isKing)
    {
        PositionX = x;
        PositionY = y;
        IsKing = isKing;
        IsCaptured = false;
    }
}

public class Game
{
    private List<CheckerPiece> _allPieces;

    public Game(List<CheckerPiece> pieces)
    {
        _allPieces = pieces;
    }

    private List<CheckerPiece> GetCapturedPieces()
    {
        return _allPieces.Where(piece => piece.IsCaptured).ToList();
    }

    public int CalculateTurnScore(CheckerPiece piece)
    {
        int baseScore = piece.IsKing ? 15 : 10;
        int capturedScore = CalculateCapturedPiecesScore();
        return baseScore + capturedScore;
    }

    private int CalculateCapturedPiecesScore()
    {
        var capturedPieces = GetCapturedPieces();
        return capturedPieces.Count * 5;
    }
}