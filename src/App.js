import React, {Component} from 'react';
import axios from 'axios'
import './App.css';
import View from './View'
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import NewsCard from './newsCard';
import Featured from './Featured';
import AddArticle from './AddArticle';
import UpdateArticle from './UpdateArticle';

var urlPrefix = 'http://localhost:4000/api'

class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      activeView:'home',
      news:[
        {
          id: 1,
          title: "Title",
          author: "John Smith",
          category: "World",
          source: "Source",
          timestamp: "2020 21/08 15:00",
        },
        {
          id: 2,
          title: "Title",
          author: "John Doe",
          category: "World",
          source: "Source",
          timestamp: "2020 21/08 15:00",
        },
      ]
    };
  }

  setActiveView = (view) => {
    this.setState({activeView:view})
  }

  getArticles = (id) => {
    axios.get(urlPrefix+'/articles')
    .then(res => {
      this.setState({news:res.data})
    })
  }

 


  componentDidMount(){
    this.getArticles()
  }


  render(){
    return (
      <div className="app">
        <View viewName="home" activeView={this.state.activeView} className="home">
          <header>
              <div className="logo"><span>dot</span>news</div>
              <div className="header-right">
                  <div>Add Article</div>
                  <i className="far fa-plus-square" onClick={
                    ()=>this.setActiveView('add-article')
                  }></i>
              </div>
          </header>

          <div className="main">
            <Featured />
  
            <Tabs defaultActiveKey="world" id="tabs-home" className="nav nav-tabs">
                  <Tab eventKey="world" title="World" className="nav-item">
                    <div className="container">
                      <div className="news-cards">
                        
                        {
                          this.state.news.map((newsItem) =>{
                            var newsItemProps ={
                              ...newsItem,
                              setActiveView: this.setActiveView,
                            }
                            return (<NewsCard {...newsItemProps}/>)
                          })
                        }
                      </div>
                  </div>
                  </Tab>
                  <Tab eventKey="nation" title="Nation" className="nav-item">
                    <div className="container">
                      <div className="news-cards">
                        <NewsCard setActiveView={this.setActiveView}/>
                        <NewsCard setActiveView={this.setActiveView}/>
                        <NewsCard setActiveView={this.setActiveView}/>
                      </div>
                    </div>
                  </Tab>
                  <Tab eventKey="business" title="Business" className="nav-item">
                    <div className="container">
                        <div className="news-cards">
                          <NewsCard setActiveView={this.setActiveView}/>
                          <NewsCard setActiveView={this.setActiveView}/>
                          <NewsCard setActiveView={this.setActiveView}/>
                        </div>
                      </div>
                  </Tab>
              </Tabs>
  
              
  
          </div>
        </View>

        <View viewName="add-article" activeView={this.state.activeView} className="add-article">
          <AddArticle setActiveView={this.setActiveView}/>
        </View>

        <View viewName="update-article" activeView={this.state.activeView} className="update-article">
          <UpdateArticle setActiveView={this.setActiveView} />
        </View>
    </div>
    )
  }
}

export default App;
