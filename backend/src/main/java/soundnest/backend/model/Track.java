package soundnest.backend.model;

public record Track(
    String encoded,
    TrackInfo info,
    Object pluginInfo,
    Object userData) {
}
