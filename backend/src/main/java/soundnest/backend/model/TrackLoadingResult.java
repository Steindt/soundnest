package soundnest.backend.model;

import java.util.Optional;

public record TrackLoadingResult(
    LoadResult loadType,
    Optional<LoadResultData> data) {

}
