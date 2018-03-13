import React from 'react';
import { connect } from 'react-redux';

const SearchAndSort = ({ params }) => {
  let input;
  const myFunction = () => {
    document.getElementById("guinzar-myDropdown").classList.toggle("guinzar-show");
  }
  window.onclick = event => {
    if (!event.target.matches('.guinzar-dropbtn')) {
      var dropdowns = document.getElementsByClassName("guinzar-dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('guinzar-show')) {
          openDropdown.classList.remove('guinzar-show');
        }
      }
    }
  }
  var sortType = 'Chompy Sort';
  if (params.sort_by) {
    if (params.sort_by === 'date_desc') {
      sortType = 'Newest First'
    } else if (params.sort_by === 'date_asc') {
      sortType = 'Oldest First'
    } else if (params.sort_by === 'rating_desc') {
      sortType = 'Highest Rated'
    } else if (params.sort_by === 'rating_asc') {
      sortType = 'Lowest Rated'
    }
  }
  return (
    <div className="guinzar-search-sort">
      <div>
        <input className="guinzar-search-input" ref={node => { input = node; }}
        onKeyPress={(e) => {
          if (e.key == 'Enter') {
            if (input.value.length) {
              window.location = '/' + params.id + '?q=' + input.value;
            }
            input.value = '';
          }
        }}/>
        <button onClick={() => {
          if (input.value.length) {
            window.location = '/' + params.id + '?q=' + input.value;
          }
          input.value = '';
        }}>
        Search
        </button>
      </div>
      <div>
        <div className="guinzar-dropdown">
          <button onClick={myFunction} className="guinzar-dropbtn">{sortType}</button>
          <div id="guinzar-myDropdown" className="guinzar-dropdown-content">
            <a href={'/' + params.id}>Chompy Sort</a>
            <a href={'/' + params.id + '?sort_by=date_desc'}>Newest First</a>
            <a href={'/' + params.id + '?sort_by=date_asc'}>Oldest First</a>
            <a href={'/' + params.id + '?sort_by=rating_desc'}>Highest Rated</a>
            <a href={'/' + params.id + '?sort_by=rating_asc'}>Lowest Rated</a>
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    params: state.params
  };
};
export default connect(mapStateToProps)(SearchAndSort);