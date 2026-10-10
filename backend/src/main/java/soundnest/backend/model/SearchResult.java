package soundnest.backend.model;

import java.util.ArrayList;

public record SearchResult(ArrayList<Track> tracks) implements LoadResultData {

}
