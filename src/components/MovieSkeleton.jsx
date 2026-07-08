import "../css/MovieSkeleton.css";

function MovieSkeleton() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-poster pulse"></div>
      <div className="skeleton-info">
        <div className="skeleton-title pulse"></div>
        <div className="skeleton-text pulse"></div>
      </div>
    </div>
  );
}

export default MovieSkeleton;
