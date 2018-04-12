import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      categoriesById: {
        100: {
          parentCategoryId: '-1',
          name: 'Business',
          keywords: 'Money',
          level: '1'
        },
        200: {
          parentCategoryId: '-1',
          name: 'Tutoring',
          keywords: 'Teaching',
          level: '1'
        },
        101: {
          parentCategoryId: '100',
          name: 'Accounting',
          keywords: 'Taxes',
          level: '2'
        },
        102: {
          parentCategoryId: '100',
          name: 'Taxation',
          keywords: '',
          level: '2'
        },
        201: {
          parentCategoryId: '200',
          name: 'Computer',
          keywords: '',
          level: '2'
        },
        103: {
          parentCategoryId: '101',
          name: 'Corporate Tax',
          keywords: '',
          level: '3'
        },
        202: {
          parentCategoryId: '201',
          name: 'Operating System',
          keywords: '',
          level: '3'
        },
        109: {
          parentCategoryId: '101',
          name: 'Small business Tax',
          keywords: '',
          level: '3'
        }
      },
      categoriesByLevel: {
        1: ['100','200'],
        2: ['101','102','201'],
        3: ['103','109','202']
      },
      searchParam: '',
      newCategoryId: '',
      newParentId: '',
      newName: '',
      newKeywords: ''
    };
  }

  addCategory = (newCategoryId, newParentId, newName, newKeywords) => {
    if (this.state.categoriesById[newCategoryId])
      return;
    let newCategoriesById = { ...this.state.categoriesById };
    let newLevel = '1';
    if (newParentId !== -1) {
      let newLevelNum = parseInt(newCategoriesById[newParentId].level, 10) + 1;
      newLevel = '' + newLevelNum;
    }
    newCategoriesById[newCategoryId] = {
      parentCategoryId: newParentId,
      name: newName,
      keywords: newKeywords,
      level: newLevel
    };
    let newCategoriesByLevel = { ...this.state.categoriesByLevel };
    if (newCategoriesByLevel[newLevel])
      newCategoriesByLevel[newLevel].push(newCategoryId);
    else
      newCategoriesByLevel[newLevel] = [newCategoryId];
    this.setState({
      categoriesById: newCategoriesById,
      categoriesByLevel: newCategoriesByLevel
    });
  };

  findCategories = (id) => {
    let outStr = '';
    let numId = parseInt(id, 10);
    if (!numId) {
      return outStr;
    }
    if (numId < 100) {
      //find categories by level
      if (!this.state.categoriesByLevel[id]) {
        return outStr;
      }
      this.state.categoriesByLevel[id].forEach((cat, index) => {
        if (index > 0)
          outStr += ', ';
        outStr += cat;
      });
    }
    else {
      //find category by id
      let cat = this.state.categoriesById[id];
      if (!cat) {
        return outStr;
      }
      outStr = 'ParentCategoryID=' + cat.parentCategoryId + ', Name=' + cat.name + ', Keywords=' + cat.keywords;
    }
    return outStr;
  };

  clearCategories = () => {
    this.setState({
      categoriesById: {},
      categoriesByLevel: {
        1: []
      },
      searchParam: '',
      newCategoryId: '',
      newParentId: '',
      newName: '',
      newKeywords: ''
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div>
          <button>Clear Categories</button>
        </div>
        <div>
          <div>
            id <input />
          </div>
          <div>
            parent id <input />
          </div>
          <div>
            name <input />
          </div>
          <div>
            keywords <input />
          </div>
          <div>
            <button>Add Category</button>
          </div></div>
        <div>
          <input />
          <button>Search</button>
        </div>
        <div></div>
      </div>
    );
  }
}

export default App;
