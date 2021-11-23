import React from 'react'
import {
    Container,
    Grid,
    Icon,
    List,
    Segment,
} from 'semantic-ui-react'

const Footer = () => {
    return <>
        <Segment inverted style={{ margin: '0.25em 0em 0em 0em', padding: '1.5em 0em' }}>
            <Container textAlign='center'>
                <Grid inverted>
                    <Grid.Column width={4} style={{ textAlign: 'left' }}>
                        <h4> Follow us</h4>
                        <Grid.Column>
                            <a href='https://www.facebook.com/lighthousereports/' target="_blank" className="socialicon"><Icon name='facebook' /></a>
                            <a href='https://twitter.com/LHreports/' target="_blank" className="socialicon"><Icon name='twitter' /></a>
                            <a href='https://www.linkedin.com/company/lighthouse-reports/' target="_blank" className="socialicon"><Icon name='linkedin' /></a>
                        </Grid.Column>
                    </Grid.Column>
                    <Grid.Column width={8} style={{ textAlign: 'left' }}>
                        <List link inverted>
                            <List.Item ><a href="tel:+31 6 40229299">+31 6 40229299</a></List.Item>
                            <List.Item ><a href="mailto:info@lighthousereports.nl" target="_blank">info@lighthousereports.nl</a></List.Item>
                            <List.Item><h4 style={{ color: '#f5f7f8' }}>© Lighthouse Reports 2021</h4></List.Item>
                            <List.Item><p style={{ color: '#f5f7f8' }}>Lighthouse Reports is an investigative nonprofit newsroom working with Europe’s leading media.</p></List.Item>
                        </List>
                    </Grid.Column>
                </Grid>
            </Container>
        </Segment></>
}

export default Footer;