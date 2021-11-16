import React from 'react'
import { Button, Icon, Image, Modal } from 'semantic-ui-react'
import CountryComparisonChart from "../../components/CountryComparisonChart";


const ComparisonExplainer = (props) => {
  const { open, setOpen,
    categories,
    categorySubaggData,
    catInitials } = props;
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

<h3>Transparency: policies often shrouded in secrecy</h3>
<br />
<p>
Since most countries are vague in their policies on the undocumented, we evaluated the policies from several different angles to determine how inclusive they are.
<br />
<br />
The first thing to understand is just how difficult it is to even figure out what a country’s vaccine policy is, let alone what it says. For transparency, we measure whether there is an official vaccine strategy online, whether the government has made public statements explaining the strategy, whether the budget is public, who was involved in coming up with the strategy and finally whether undocumented people were part of the process. Even when these documents were found, they more often than not failed to mention undocumented people. 
<br />
<br />
{/* [screenshot of just transparency category results from microsite] */}
<CountryComparisonChart
  width={320}
  height={300}
  data={categorySubaggData["Policy Transparency"]}
  range={catInitials["Policy Transparency"].range}
/>
<br />
<br />
The second thing to note is that we would expect countries that score highly on policy transparency to score either very high or very low on the Scorecard. In general, this is not the case. In theory, if information is publicly available, it would be easy for researchers to evaluate how undocumented people would be impacted by these policies, for better or worse. But, since across Europe, policies are patchy and vague, transparency scores across the board are often low. Researchers had to dig deeper, beyond formal policies and statements, to identify policies that would impact undocumented people’s access to the vaccine.
<br />
<br />
</p>
<h3>
Undocumented Access: reading between the lines
</h3>
<br />
<p>
The question of the accessiblity of the COVID-19 vaccine for undocumented people is the core purpose of this project and that is why it’s given the most weight in the Scorecard. The countries that block undocumented people from getting vaccinated are more explicit about it than even the countries with the most progressive policies to provide vaccine access. So countries like Poland and Czech Republic have extremely negative results in contrast to the United Kingdom and Portugal’s moderately positive scores. 
<br />
<br />
{/* [screenshot undocumented category from microsite] */}
<CountryComparisonChart
  width={320}
  height={300}
  data={categorySubaggData["Undocumented Access"]}
  range={catInitials["Undocumented Access"].range}
/>
<br />
<br />
Most countries scored moderately well, or moderately badly. That is because policies did not explicitly exclude or include undocumented people in vaccination campaigns. For these countries, it was difficult to even determine whether undocumented people are able to get vaccinated or not, just by looking at government policies and public statements. 
<br />
<br />
In some countries however, we could clearly see that undocumented people are excluded from the vaccination of the general population, either because this is explicitly mentioned, or because they are left off of priority lists that include other vulnerable groups. This is the case for Poland, the Czech Republic and Slovakia. 
<br />
<br />
The vast majority of other countries, which scored somewhere in the middle, generally use vague wordings such as “residents”, or “all people in the country”, when they talk about who has access to the vaccines (in Ireland, Estonia, Germany and Austria, for example). Because these terms are not explained further in public statements, we scored them in the middle: it is not clear if undocumented people are included or not. Much is left to the discretion of implementers, and even in the same country, outcomes might look different in practice, such as in Spain and Italy, where regions have basically autonomous vaccination strategies. 
<br />
<br />
Only two countries, the United Kingdom and Portugal, had positive policies towards vaccinating undocumented people. Here, the government has guaranteed in both official policy and in public statements that undocumented people can and should get vaccinated. They have also made it clear that undocumented people do not need an official identification card when they receive the vaccine.  
<br />
<br />
We also measured whether access is equitable: so whether the choice of the vaccine, and its cost are the same as for citizens. Again, most countries fall somewhere in the middle, mostly because policies are unclear, contradictory or hard to find. So not only is it unclear whether undocumented people can get vaccinated, it might be unclear who will pay for it or if they will be offered the same vaccine options as citizens. At the other extreme, some countries like Slovakia, the Czech Republic and Poland explicitly exclude any access, let alone equitable access, to the vaccine for undocumented people. 
</p>
<h3>
Identification and Residency: Another avenue for determining access
</h3>
<br />
<p>
Since undocumented people were mostly absent from official policies, identification requirements and residency requirements are an indirect way to determine whether the undocumented are able to get vaccinated. For the majority of countries, identification and residency requirements are clear either in policy documents or on the vaccine registration page and may offer the best way to assess in practical terms, whether an undocumented person is able to get vaccinated. All but five of the countries scored positively in this category. If a country mandates a national ID -- or other types of documents which require a person to be registered with that country’s authorities -- to get a vaccine, as is the case in Denmark, Estonia, Germany, Greece, clearly undocumented people are unlikely to be able to get vaccinated. On the other hand, in France, policy documents specifically say residency is not required, making it more likely that an undocumented person would be able to get vaccinated. 
<br />
<br />
</p>
<h3>
Marginalised Access: Accommodations for Vulnerable Groups
</h3>
<br />
<p>
In many countries, it was easier to determine how the government was addressing the needs of other vulnerable groups: people in detention or without freedom of movement, people who are not fluent in the main local language, people without internet access, means of transportation, or people who are housing insecure. It is worth investigating whether it is less politically risky to directly address the needs of vulnerable citizens than of undocumented people. 
<br />
<br />
{/* [screenshot of marginalized category]  */}
<CountryComparisonChart
  width={320}
  height={300}
  data={categorySubaggData["Marginalized Access"]}
  range={catInitials["Marginalized Access"].range}
/>
<br />
<br />
In the UK, the Netherlands, Denmark and France policies make a variety of accommodations for marginalised groups. Overall, countries were much more open about guaranteeing access to marginalised groups in general than they are for undocumented people in particular. So while so-called welfare states have clear accessibility policies, there is often no clarity about whether undocumented people can also take advantage of those resources even though often the needs overlap. Only the UK for example, scores high on both inclusion of marginalised groups in general and inclusion of undocumented people in particular. The other countries that score highly on including marginalised groups in fact have negative scores for including undocumented people (Netherlands and Denmark). Countries that scored zero or below usually did not mention marginalised groups or in some cases, explicitly excluded them. 
<br />
<br />
</p>
<h3>
Privacy Guarantees: how safe it is to get vaccinated 
</h3>
<br />
<p>
Undocumented people often live in fear of having their immigration status reported when they try to access public services. Privacy guarantees are therefore critical to making vaccines accessible. This has been understood in some policy circles where “firewalls” are proposed to ensure undocumented people understand that their status will not be reported when they access health care services. But these firewalls must be explicitly communicated to ensure confidence among the group they are intended to protect.
<br />
<br />
{/* [screenshot of privacy results] */}
<CountryComparisonChart
  width={320}
  height={300}
  data={categorySubaggData["Privacy Guarantees"]}
  range={catInitials["Privacy Guarantees"].range}
/>
<br />
<br />
Overall, countries were split on privacy guarantees. Absence of clear privacy guarantees are a major barrier to vaccine access. Often, the same countries lacking clear policies on undocumented people also lacked clear policies on privacy such as Austria, Belgium and Italy. So even if the countries may have avenues for undocumented people to get vaccinated, even if they do not say so explicity, but they have open ID and residency policies, such as in France, the lack of privacy guarantees and fear of deportation could outweigh an undocumented person’s desire to get vaccinated. 
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

export default ComparisonExplainer