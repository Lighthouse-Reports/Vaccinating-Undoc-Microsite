
import React, { useState, useRef, useEffect } from 'react';
import { Button, Icon, Modal, Popup, TextArea } from 'semantic-ui-react';

function CardShareWidget(props) {
  const [open, setOpen] = React.useState(false);
  const { shareRoute, height } = props
  
  let location = window.location;
  // console.log(location)

  const getEmbedUrl = () => {
    let url = location.origin + shareRoute;
    return url;
  };


  const getIframeHTML = (height) => {
    const embedURL = getEmbedUrl();
    console.log(embedURL)
    return {
      url: embedURL,
      html:
        // "<iframe id='inlineFrameVaccinationScoreCard' title='Vaccinating Europe's Undocumented: A Policy Scorecard' width='100%' src='" +
        // embedURL +
        // "'></iframe>",
        "<iframe id='inlineFrameVaccinationScoreCard' style='border:none; overflow: hidden; height:640px; padding:5px' title='Vaccinating Europe\'s Undocumented: A Policy Scorecard' width='100%' src='"
        + embedURL
        + "'></iframe>"
    
        // "<iframe id='inlineFrameVaccinationScoreCard' style='border:none; height:800px' title='Vaccinating Europe\'s Undocumented: A Policy Scorecard" width='100%' src='http://localhost:3000/share/hexmap'></iframe>
    };
  };


  const shareModal = <Modal
      centered={false}
      closeIcon
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size='tiny'
      trigger={
        <Icon 
          className={'shareIcon'}
          // size="medium"
          name="share alternate"
        />
      }
    >
      {/* <Header icon>
        <Icon name='archive' />
        Archive Old Messages
      </Header> */}
      <Modal.Content>
        <Modal.Description>
        <h4>Get embed code to share this on your website </h4>
        <br/>
        </Modal.Description>
        <Modal.Description>
        <p>Copy and paste this code on your site where you want the summary profile to appear.</p>
        </Modal.Description>

        <Modal.Description>
          <TextArea
            cols={30}
            readOnly={true}
          >{getIframeHTML().html}</TextArea>
        </Modal.Description>
        
      </Modal.Content>
      <Modal.Actions>
        {/* <Button basic color='red' inverted onClick={() => setOpen(false)}>
          <Icon name='remove' /> No
        </Button> */}
        {/* <Button  inverted onClick={() => selectHighlightCountry("")}>
          <Icon name='arrow left' /> Back
        </Button> */}
      </Modal.Actions>
  </Modal>

  return (
    <div style={{display:"inline"}}>
    <Popup 
      content='Get embed code to share this on your website' 
      trigger={shareModal} 
    /><br/>
    </div>
  )
}

export default CardShareWidget