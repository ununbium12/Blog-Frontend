import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import BlogItem from "./BlogItem";
import MyButton from "./MyButton";
import { BlogStateContext, ListDataContext } from '../App';
import Axios from 'axios';

const sortOptionList = [
  {value : "latest", name : "최신 순"},
  {value : "oldest", name : "오래된 순"},
]

const ControlMenu = React.memo(({ value, onChange, optionList }) => {
  return (
    <select
      className="ControlMenu"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {optionList.map((it, idx) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  );
});

const BlogList = ({ blogList }) => {
  const navigate = useNavigate();
  const [sortType, setSortType] = useState('latest');
  const [filter, setFilter] = useState("all");


  const getProcessedBlogList = () => {

    const filterCallBack = (item) => {
      if (filter === 'good') {
        return parseInt(item.emotion) <= 3;
      } else {
        return parseInt(item.emotion) > 3;
      }
    };

    const compare = (a, b) => {
      if(sortType === 'latest') {
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    };

    const copyList = JSON.parse(JSON.stringify(blogList));

    const filteredList = filter === 'all' ? copyList : copyList.filter((it) => filterCallBack(it));

    const sortedList = filteredList.sort(compare);
    return sortedList;
  };

  return (
    <div className="BlogList">
      <div className="menu_wrapper">
        <div className="left_col">
          <ControlMenu
            value={sortType}
            onChange={setSortType}
            optionList={sortOptionList}
          />
        </div>
        <div className="right_col">
          <MyButton 
            type = {'positive'}
            text={'새 개시물 쓰기'}
            onClick={() => navigate('/new')}
          />
        </div>
      </div>
      {getProcessedBlogList().map((it) => (<BlogItem key={it.id} {...it} />))}
    </div>
  );
};

BlogList.defaultProps = {
  blogList: [],
};

export default BlogList;