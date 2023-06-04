import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


library.add(faSearch);
const Topbar = () =>{
    return <div className="search-bar">
          <input type="text" placeholder="Search..." />
          <button className="search-button">
          <FontAwesomeIcon icon={faSearch} /> 
          </button>
        </div>;
}
export default Topbar;