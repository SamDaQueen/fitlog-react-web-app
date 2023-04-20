import { faSearch } from "@fortawesome/free-solid-svg-icons/faSearch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SearchBar = ({ search, setSearch, handleSearch }) => {
  return (
    <>
      <div className="row mt-4 mb-3">
        <form className="col-12" onSubmit={handleSearch}>
          <div className="row">
            <div className="col-md-11">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search for exerises"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-1">
              <button type="submit" className="btn btn-primary float-end">
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default SearchBar;
