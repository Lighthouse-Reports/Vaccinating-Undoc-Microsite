import "semantic-ui-css/semantic.min.css";
import React, { useState, useEffect, useRef } from "react";
import { iconsPathPrefix } from '../helpers/constants';
import { Container, Card, Dimmer, Loader, Image, Segment } from "semantic-ui-react";
import { csvParse } from "d3-dsv";
import axios from "axios";

function InvestigationPage(props) {

  const {pageName,filterType} = props;

  const [investigationsData, setInvestigationsData] = useState([]);
  useEffect(() => {

    axios({
        method: 'get',
        url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRbqxlWOrO16FOp7rNc-_DjCO7KYEFO2aeE3uc2B3ub-jqIcOctKVlYNWf4_Cd29YEnpAqmnWzYHCc7/pub?gid=0&single=true&output=csv',
        responseType: 'stream'
      })
      .then(function (response) {
        // console.log(response)
        if (response && response.data) {
          setInvestigationsData(csvParse(response.data))
        }
      }); 
    
  },[])


  return (
    <div className={'AboutPage'} >
        <Container>
        <h1 className={"scoreCardPageHead"}>{pageName}</h1>
        
        {
          investigationsData && investigationsData.length > 0
          ? <Card.Group>
              {
                investigationsData
                  .filter(d => d.type === filterType)
                  .map(articleInfo => {
                  // console.log(articleInfo)
                  return   <Card
                      image={articleInfo["photo_link"]}
                      header={articleInfo["headline"]}
                      target={"_blank"}
                      // meta='Friend'
                      href={articleInfo["article_link"]}
                      description={articleInfo["blurb"]}
                      extra={
                        <Card.Content extra>
                          <img 
                            src={iconsPathPrefix+"flaground/"+articleInfo["country"].replace(" ","_")+"_96.png"} 
                            height="30" 
                            width="30" 
                            className={"flag"}
                          />
                        </Card.Content>
                      }
                    />
                })
              }
            </Card.Group>
          : <Segment>
              <Dimmer active inverted>
                <Loader inverted>Loading</Loader>
              </Dimmer>
        
              <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
            </Segment>
        }
        
        </Container>
    </div>
  );
}

export default InvestigationPage;