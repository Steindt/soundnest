package soundnest.backend.model;

import java.util.Optional;

public record TrackInfo(
    String identifier,
    boolean isSeekable,
    String author,
    int length,
    boolean isStream,
    int position,
    String title,
    Optional<String> uri,
    Optional<String> artworkUrl,
    Optional<String> isrc,
    String sourceName) {
}
