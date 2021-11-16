import React from 'react'
import { Button, Icon, Image, Modal } from 'semantic-ui-react'


const HomeExplainer = (props) => {
  const { open, setOpen } = props;
  // const [open, setOpen] = React.useState(false)
  console.log(open)

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      // trigger={<Button>Scrolling Content Modal</Button>}
    >
      <Modal.Header><h1 className={"mainTitle"}>The Uncounted In The Pandemic</h1></Modal.Header>
      <Modal.Content  scrolling>
        
        <Modal.Description>
        <p>Countries across Europe have rallied behind national vaccine campaigns, urging everyone to do their part to protect public health in times of crisis. A deluge of numbers have followed: numbers of infections, of vaccines administered, of hospitalisations, of deaths. This scorecard addresses a group of people who have been largely absent from these numbers: Europe’s undocumented. The majority of undocumented migrants in Europe are excluded from the health systems and find themselves among the most vulnerable groups in the pandemic. 
<br />
<br />
While the so-called "hostile environment" and other exclusionary immigration policies have become common in Europe, public health experts have long warned that these choices carry profound risks for the broader society. The pandemic has demonstrated the need to separate access to healthcare (and vaccines) from political positions on immigration. But how can we assess whether governments are taking this onboard?
<br />
<br />
This project attempts to count those who governments have decided not to count, by reading between the lines of vaccination strategies, implementation plans, policies and statements to determine, at least on paper, how easy or difficult it is for undocumented migrants to be vaccinated against COVID-19. Read more about how and why we developed this scorecard <a href="https://lighthouse-reports.github.io/Vaccinating-Undoc-Microsite/about">here</a>. 
<br />
<br />
Because the quality of information varies very widely from country to country, we have not ranked them, instead, within the borders of each country, you will find a small snapshot of results on: 
<br />
<br />
<ul>
  <li>Policy Transparency</li>
  <li>Undocumented Access </li>
  <li>Identity and Residency Requirements</li>
  <li>Marginalised Access </li>
  <li>Privacy Guarantees</li>
</ul>

</p>
[dashboard screenshot]

<p>
A green bar above the X axis means they received a positive score for that category. An orange bar below the X axis means they received a negative score for that category. Click on a category to compare results across countries. Click on a country to get the detailed results for that country.  
<br />
</p>

<h2>A Grim Picture For Vaccine Access</h2>
<p>
Across the 18 countries in our sample, the two highest scorers are the United Kingdom and Portugal. They are the only ones which received positive scores in all categories, earning the label “Open and Accessible”. This means that for the UK and Portugal, we were able to find written material confirming that: vaccination plans and strategies are publicly available; that undocumented people are given access to the vaccine; that identification and residency requirements are specified; that other marginalised groups are also granted some level of access to vaccination; and that there is a good level of privacy guarantees for those who do get the vaccine. 
<br />
<br />
At the other end of the scale are the “Closed Door” countries: Slovakia, Czech Republic and Poland, all of which are explicitly exclusionary. While Poland did score positively in Policy Transparency and Identification and Residency Requirements, it scored extremely poorly in Undocumented Access and Privacy Guarantees and moderately badly on Marginalised Access. To put it another way, their policies are transparently exclusionary. For Slovakia and the Czech Republic the results are similar, with very low scores in the category of Undocumented Access, clearly due to the fact that the undocumented are explicitly excluded. Out of the three, the Czech Republic is the only country which also scored negatively on Policy Transparency. 
</p>
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

export default HomeExplainer