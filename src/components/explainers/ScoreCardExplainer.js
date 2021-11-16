import React from 'react'
import { Button, Grid, Icon, Image, Modal } from 'semantic-ui-react'
import ScorecardQuestion from '../../components/ScorecardQuestion';

const ScoreCardExplainer = (props) => {
  const { open, setOpen, questionData, scoreData } = props;
  // const [open, setOpen] = React.useState(false)
  console.log(open)
  const iso = 'PRT'
  const width = 260;
  const height = 100;

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      // trigger={<Button>Scrolling Content Modal</Button>}
    >
      <Modal.Header><h1 className={"mainTitle"}>Portugal Policies Set the Tone for Positive Practices</h1></Modal.Header>
      <Modal.Content  scrolling>
        
        <Modal.Description>
        <p>
        To understand how we transformed our research into scores, we have selected one country and explained the evidence that led the researcher to an answer for each question. To replicate the process for any country on the scorecard, please find the original questions, answers and source documents <a href="https://github.com/Lighthouse-Reports/Vaccinating-the-Undocumented">here</a>. 
        <br/>
        <br/>
Portugal, one of only two countries that scores positively in the scorecard in all categories, illustrates how a country’s overall policy can set the tone for a country’s vaccination campaign, even if the reality follows the spirit, if not the letter, of the policy. 
{/* Below we explain how we transformed policy documents and public statements into numbers and those numbers into scores.  */}
<br/>
<br/>
<h3>
Transparency
</h3>
<h4>
National vaccination documents are available publicly online
</h4>
{/* [embed of this question result] T1 */}
<Grid centered stackable columns={2}>
  <Grid.Row>
    <Grid.Column   width={6}>
      <div className={"questionContainer"} width={width}>
      <ScorecardQuestion
        data={{
          question: questionData['T1'][0],
          score: scoreData[iso]['trans']['T1'][0]
        }}
        width={width}
        height={height}
        key={"QuestionT1"}
        shareRoute={"/share/card/question/"+iso+"/trans/T1"}
      />
      </div>
    </Grid.Column>
    <Grid.Column  width={9}>
    Portugal’s national vaccine documents include the vaccination strategy, the logistics and distribution process for vaccines, the online registration process, the administration of the vaccine and surveillance of any adverse reactions, as well as an outline to promote transparent communication with the population about the importance of vaccination.
    </Grid.Column>
  </Grid.Row>
</Grid>


<h4>
National authorities have explained the vaccine policies through public statements, declarations or commitments
</h4>
{/* [embed of this question result] T2 */}
<Grid centered stackable columns={2}>
  <Grid.Row>
    <Grid.Column   width={6}>
      <ScorecardQuestion
        data={{
          question: questionData['T2'][0],
          score: scoreData[iso]['trans']['T2'][0]
        }}
        width={width}
        height={height}
        key={"QuestionT2"}
        shareRoute={"/share/card/question/"+iso+"/trans/T2"}
      />
    </Grid.Column>
    <Grid.Column  width={9}>
    In this case, a video of government officials provides a walk through of the national vaccine strategy.
    </Grid.Column>
  </Grid.Row>
</Grid>


<h4>
Budget for vaccination campaign is available publicly
</h4>
{/* [embed of this question result] T3 */}
<Grid centered stackable columns={2}>
  <Grid.Row>
    <Grid.Column   width={6}>
      <ScorecardQuestion
        data={{
          question: questionData['T3'][0],
          score: scoreData[iso]['trans']['T3'][0]
        }}
        width={width}
        height={height}
        key={"QuestionT3"}
        shareRoute={"/share/card/question/"+iso+"/trans/T3"}
      />
    </Grid.Column>
    <Grid.Column  width={9}>
    No budget is available.
    </Grid.Column>
  </Grid.Row>
</Grid>

<h4>
There is a specific budget amount earmarked for the vaccination of undocumented people.
</h4>
{/* [embed of this question result] T11 */}
<Grid centered stackable columns={2}>
  <Grid.Row>
    <Grid.Column   width={6}>
      <ScorecardQuestion
        data={{
          question: questionData['T11'][0],
          score: scoreData[iso]['trans']['T11'][0]
        }}
        width={width}
        height={height}
        key={"QuestionT11"}
        shareRoute={"/share/card/question/"+iso+"/trans/T11"}
      />
    </Grid.Column>
    <Grid.Column  width={9}>
    No budget is available.
    </Grid.Column>
  </Grid.Row>
</Grid>
<h4>
The list of contributors to the development of vaccination policies is available publicly
</h4>
{/* [embed of this question result] T6 */}
<Grid centered stackable columns={2}>
  <Grid.Row>
    <Grid.Column   width={6}>
      <ScorecardQuestion
        data={{
          question: questionData['T11'][0],
          score: scoreData[iso]['trans']['T11'][0]
        }}
        width={width}
        height={height}
        key={"QuestionT11"}
        shareRoute={"/share/card/question/"+iso+"/trans/T11"}
      />
    </Grid.Column>
    <Grid.Column  width={9}>
    A partial list of the people and organizations involved in the elaboration of the national vaccination policy is available. 
    </Grid.Column>
  </Grid.Row>
</Grid>
<h4>
Undocumented people or organisations representing them have contributed to the development of the vaccination policies
</h4>
<br/>
With only a partial list, it’s not possible to determine whether undocumented people or their representatives were involved.

<h3>Undocumented Access</h3>

<h4>Language in official written vaccination documents is inclusive of undocumented people</h4>
{/* [embed of this question result] T4 */}
<Grid centered stackable columns={2}>
  <Grid.Row>
    <Grid.Column   width={6}>
      <ScorecardQuestion
        data={{
          question: questionData['T4'][0],
          score: scoreData[iso]['undoc']['T4'][0]
        }}
        width={width}
        height={height}
        key={"QuestionT4"}
        shareRoute={"/share/card/question/"+iso+"/undoc/T4"}
      />
    </Grid.Column>
    <Grid.Column  width={9}>
    Portugal’s national rollout documents describe vaccine access as “universal” and goes on to say the vaccine will be available independent of a person’s regularization status. 
    </Grid.Column>
  </Grid.Row>
</Grid>
<h4>
Language in official vaccination statements is inclusive of undocumented people
</h4>
{/* [embed of this question result] T5 */}
<Grid centered stackable columns={2}>
  <Grid.Row>
    <Grid.Column   width={6}>
      <ScorecardQuestion
        data={{
          question: questionData['T5'][0],
          score: scoreData[iso]['undoc']['T5'][0]
        }}
        width={width}
        height={height}
        key={"QuestionT5"}
        shareRoute={"/share/card/question/"+iso+"/undoc/T5"}
      />
    </Grid.Column>
    <Grid.Column  width={9}>
    The government task force explained that it was examining the fastest way to vaccinate “illegal immigrants” within its plan to provide immunization for all residents in Portugal as long as they meet clinical criteria. 
    </Grid.Column>
  </Grid.Row>
</Grid>
<h4>
Undocumented people can access the vaccine without needing an ID
</h4>
{/* [embed of this question result] A3 */}

<Grid centered stackable columns={2}>
  <Grid.Row>
    <Grid.Column   width={6}>
      <ScorecardQuestion
        data={{
          question: questionData['A3'][0],
          score: scoreData[iso]['undoc']['A3'][0]
        }}
        width={width}
        height={height}
        key={"QuestionA3"}
        shareRoute={"/share/card/question/"+iso+"/undoc/A3"}
      />
    </Grid.Column>
    <Grid.Column  width={9}>
    Portugal provides a separate vaccine registration website for people not registered in the national health center that does not require a national ID number, though it does require entering nationality and address. 
    </Grid.Column>
  </Grid.Row>
</Grid>
<h4>
Undocumented people have the same access to the vaccine as all others, including in terms of prioritisation
</h4>
{/* [embed of this question result] A11 */}

<Grid centered stackable columns={2}>
  <Grid.Row>
    <Grid.Column   width={6}>
      <ScorecardQuestion
        data={{
          question: questionData['A11'][0],
          score: scoreData[iso]['undoc']['A11'][0]
        }}
        width={width}
        height={height}
        key={"QuestionA11"}
        shareRoute={"/share/card/question/"+iso+"/undoc/A11"}
      />
    </Grid.Column>
    <Grid.Column  width={9}>
    Though Portugal states that the vaccine is available to everyone in the country, it does not make it clear whether the access and prioritization of undocumented people is the same as for citizens.
    </Grid.Column>
  </Grid.Row>
</Grid>
<h4>
Undocumented people can access the vaccine for free or with full reimbursement, the same as everybody else
</h4>
{/* [embed of this question result] A12 */}

<Grid centered stackable columns={2}>
  <Grid.Row>
    <Grid.Column   width={6}>
      <ScorecardQuestion
        data={{
          question: questionData['A12'][0],
          score: scoreData[iso]['undoc']['A12'][0]
        }}
        width={width}
        height={height}
        key={"QuestionA12"}
        shareRoute={"/share/card/question/"+iso+"/undoc/A12"}
      />
    </Grid.Column>
    <Grid.Column  width={9}>
    Portuguese policies state that the vaccine is free for everyone. 
    </Grid.Column>
  </Grid.Row>
</Grid>
<h4>
Undocumented people have access to the same vaccines as everybody else, including choice of vaccines where this is available
</h4>
The policy does not specify whether undocumented people have the same vaccine options as citizens. 

<h3>Identification and Residency Requirements</h3>
<h4>
National vaccination documentation specifies ID requirements needed to access the vaccine
</h4>
The registration website for the general population requires entering an ID number and health card number. The registration website for individuals not registered in the national health system does not require a national ID number, though it does require entering nationality and address. 
<h4>
National vaccination documentation specifies residency requirements needed to access the vaccine
</h4>
The registration website for national health system users requires an address. The registration website for non-users requires an address as well.

<h3>Marginalised Access</h3>
<h4>
Housing insecure people have access to the vaccines
</h4>
The policies do not specify whether housing insecure people have access to the vaccines, and if so, how.
<h4>
People in detention and with other restrictions to freedom of movement have access to the vaccines
</h4>
The policies do not specify whether people in detention or with other restrictions to freedom of movement have access to the vaccines, and if so, how.
<h4>
People without Internet access have access to the vaccines
</h4>
At the beginning of the vaccination campaign, people belonging to priority groups were contacted by phone. For people who were not included, but deemed they should be, an option was available to contact their health care providers to inquire about their vaccination. 
<h4>
Mobile vaccination centres are planned 
</h4>
Policies do not include any information on whether mobile vaccination centers are part of the vaccination strategy. 
<h4>
National programmes will address misinformation and vaccine hesitancy
</h4>
Portuguese policies include specific sections on communication about vaccination. These efforts include health literacy plans through regular, transparent and trustworthy information and to combat misinformation and fake news, with the goal of generating trust in the population and ensuring acceptance of the vaccine.
<h4>
There are resources for outreach efforts to minority communities (for example, specific language support and action plans)
</h4>
The policies include the need to have information materials available in several languages, when possible, and to adjust them to the different target groups. They also mention contact with and involvement of social structures close to the population, such as the leaders of various religions, for an alignment and expansion of the message.

<h3>Privacy Guarantees</h3>
<h4>
Data sharing, data retention or protection policies are clear
</h4>
The registration website for non-users specifies that the data collected through the registration will be processed by the General Health Directorate and kept for a limited amount of time, necessary for the fulfilling of the purpose of their collection. It also mentions that consent to the treatment and processing of data can be revoked at any time, without affecting the treatment received. 
<h4>
There are official assurances that data collected during vaccination will not be shared outside of health authorities
</h4>
The registration website for non-users specifies that the data collected during the registration will only be processed in relation to the specific treatment in question, namely, the vaccination against COVID-19.
<h4>
Certificate of vaccination mentions the place the person was vaccinated (the specific location, or the country)
</h4>
The policies do not specify what type of information is included in the vaccination certificate. 
</p>
<h3>Expert Opinions</h3>
<br />
<p>
The data for the Scorecards is drawn entirely from written policies, strategies, statements, registration pages and implementation plans. We are well aware that there is — or can be — a huge difference between policies and practice. We have bridged this gap by bringing the results into the specific, on-the-ground context, in two ways:
</p>
<ul>
<li>Through country-specific reporting, which you can access <a href="https://www.lighthousereports.nl/investigation/are-covid-vaccines-reaching-the-undocumented/">here</a>. Journalists try to capture this gap between policy and reality by telling the stories of undocumented people who have tried to access the vaccine. </li>
<li>Through expert opinions: we approached a number of migration and healthcare experts in the countries in our scorecard and asked for their perspective on each of the issues covered in the scorecard. Their replies are displayed alongside the scores for each country, where they are available. These opinions are meant to provide at least one perspective on how these policies play out in reality. There may be cases where a country is actually doing much better in reality than on paper but the opposite can also be true: despite well-intentioned, inclusive policies, the vaccination of undocumented people is not effective. The experts’ opinions are meant to provide a more balanced overall picture of vaccine access for undocumented people. </li>
</ul>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setOpen(false)}>
          <Icon name='left arrow' /> Back
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default ScoreCardExplainer