package soundnest.backend.model;

import java.util.ArrayList;

public record PlaylistResult(PlaylistInfo info,
    Object pluginInfo,
    ArrayList<Track> tracks) implements LoadResultData {

}
