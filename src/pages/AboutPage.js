
import "semantic-ui-css/semantic.min.css";
import React, { useState, useEffect, useRef } from "react";
import { Container, Grid } from "semantic-ui-react";


function AboutPage(props) {

  return (
    <div className={'AboutPage'} >
      {/* <Grid container className="MainContainer">
        
      </Grid> */}
      <Container>
        <h1 className={"scoreCardPageHead"}>About</h1>          
            
        <h2>Introduction</h2>
        <p>
          Access to health care is a fundamental human right. During the pandemic it has been a matter of life or death. Among those who face the toughest challenge in accessing health care are undocumented migrants, a diverse group that ranges from exploited workers, to students overstaying visas, to people who arrived in Europe as children and are still awaiting legal status. 
          <br />
          <br />
          In this project Vaccinating Europe’s Undocumented we assess all the ways in which undocumented people are excluded or made a part of vaccination drives that European countries have implemented since December 2020 in their attempts to bring the COVID-19 pandemic under control.
          <br />
          <br />
          Exclusionary immigration policies like the UK’s infamous "hostile environment" have taken hold across much of Europe and many politicians are attuned to the idea that anti-migrant stances can make for good politics - though they make bad policy. The pandemic has demonstrated the need to separate access to health care (and vaccines) from political positions on immigration. Denying access to some means putting the collective public health at risk.
          <br />
          <br />
          “The undocumented” are a large and heterogenous section of Europe’s population. Joining everybody together under a single banner does not do justice to the myriad reasons why people find themselves without valid documents in the country where they live. Nevertheless, a common feature among many who are undocumented is that they are left out of public policies and hidden from public view. Convenient political choices make it easier to ignore this population than address it. Accurate data on undocumented populations could embarass national governments whose hardline policies swell the numbers of people denied legal status. There has been no serious effort to estimate the total undocumented population in the EU since 2009 (<a href="https://knowledge4policy.ec.europa.eu/dataset/ds00039_en">Clandestino project</a>).
          <br />
          <br />
          But the pandemic has made it clearer than ever that wilfully disregarding one  part of the population affects everybody else, even those who might support hard-line exclusionary migration policies. Excluding the undocumented from public health is not only bad policy, it can also reduce the effectiveness of vaccine campaigns. 
          <br />
          <br />
          Below are some of the reasons why a project about access to health care for the undocumented is particularly challenging: 
          <ul>
            <li>
            Many countries go out of their way not to produce accurate estimates of how many undocumented migrants are living within their borders
            </li>
            <li>
            Many countries exclude undocumented people from the public health care system so reaching out to and counting them is difficult
            </li>
            <li>
            Many countries are afraid of political backlash if they do invest resources in vaccinating undocumented people, so they prefer to either not do so or to do so quietly
            </li>
            <li>
            Many countries are not collecting data on the legal status of those being vaccinated for a variety of reasons.
            </li>
          </ul>
          <br />
          Despite these challenges, this scorecard takes the publicly available policy information that is out there and evaluates how much or how little, at least on paper, countries across Europe are doing to make the COVID-19 vaccine accessible to undocumented people.
          <br />
          <br />
          In many ways, the findings are not surprising. Cases of explicit exclusion or inclusion are rare. In most cases, policies are vague and open to interpretation.
        </p>
        <h2>The project</h2>
        <p>
        We consulted with <a href="https://picum.org/">PICUM</a>, the leading European association of groups working for undocumented rights, to design a survey to capture the policy reality of European countries’ strategies to vaccinate undocumented people. We reached out to researchers and journalism students to help us track down publicly available documents related to those vaccination strategies and implementation plans of every individual country. With the help of data experts, we converted the responses into numbers, and the numbers into a Scorecard. 
        <br />
        <br />
        The result is a national Scorecard for each of the 18 countries we analysed. Each Scorecard is divided in five categories:  
        <br />
        <h3>Policy Transparency</h3>

        Policy Transparency evaluates government efforts to make national vaccine policies available to the public. We determined whether an official vaccine strategy is available online, whether the government has made public statements explaining the strategy, whether the budget is public, who was involved in developing the strategy and finally whether undocumented people were part of the process.

        <h3>Undocumented Access </h3>

        This category addresses the central question of the scorecard: are undocumented people able to access vaccination against COVID-19? This is where researchers identified whether undocumented people are included in the language of both written and oral vaccination policies, whether undocumented people can access vaccination without an ID, and whether access is equitable: undocumented people able to get vaccinated on the same basis as regularly residing individuals, and the type and choice of vaccine, costs and prioritisation are the same. 

        <h3>Identification and Residency Requirements</h3>

        Identification and Residency Requirements is an indirect means to determine whether the undocumented are able to get vaccinated. Researchers evaluated whether national vaccination policies are explicit in the type of documentation that is needed to access the vaccine, both in terms of identification and residency. 

        <h3>Marginalised Access</h3>

        This category attempts to evaluate how a country is accommodating the needs of other marginalised groups within its borders. The Scorecard evaluates policies towards people in detention centres or without freedom of movement, people who are not fluent in the local language, people without internet access or means of transportation and people who are housing insecure. We evaluated how these groups are addressed overall, with the understanding that some undocumented people may also be part of these groups. 

        <h3>Privacy Guarantees</h3>

        Privacy Guarantees evaluates policies related to the collection, processing and sharing of data. Researchers evaluated whether these policies are publicly available and whether assurances are provided that data collected prior to and during vaccination will not be shared outside health authorities. Undocumented people often avoid accessing public services out of fear that their residency status will be reported to government authorities. Privacy guarantees are therefore critical to making vaccines accessible. Lastly, researchers measured whether the certificate of vaccination indicates the location where the vaccination took place, with the understanding that this may create additional barriers for undocumented people if they seek to move to another country undetected. 
        <br />
        <br />
        Each question, and each category, was scored and weighed. To learn more about the methodology, and how we came to the final scoring, <a href="https://github.com/Lighthouse-Reports/Vaccinating-the-Undocumented">read here</a>.
        
        
        <h2>Scorecard results</h2>
        Across the 18 countries in our sample, the two best performers are the United Kingdom and Portugal. They are the only ones which received positive scores in all categories, earning the label “Open and Accessible”. This means that for the UK and Portugal, we were able to find written material confirming that: vaccination plans and strategies are publicly available; that undocumented people are given access to the vaccine; that identification and residency requirements are specified; that other marginalised groups are also granted some level of access to vaccination; and that there is a good level of privacy guarantees for those who do get the vaccine. 
        <br />
        <br />
        At the other end of the scale are the “Closed Door” countries: Slovakia, Czech Republic and Poland, all of which are explicitly exclusionary. While Poland did score positively in Policy Transparency and Identification and Residency Requirements, it scored extremely poorly in Undocumented Access and Privacy Guarantees and moderately badly on Marginalised Access. To put it another way, their policies are transparently exclusionary. For Slovakia and the Czech Republic the results are similar, with very low scores in the category of Undocumented Access, clearly due to the fact that the undocumented are explicitly excluded. Out of the three, the Czech Republic is the only country which also scored negatively on Policy Transparency. 
        <br />
        <br />
        In some ways, the findings are not surprising. Cases of explicit exclusion or inclusion are rare. In most cases, policies are vague and open to interpretation. Overall, access to health care for undocumented people in Europe is uneven at best, purposefully impenetrable at worst. The COVID-19 pandemic exacerbated pre-existing inequalities in many areas, and access to health care for the undocumented is one of them.  
        <br />
        <br />
        The Scorecard can only assess the written policies, documents and materials we were able to find online. That means that there may be a gap between policies and practices. There may be cases where a country is actually doing better in practice than it is in policy - for example, where local initiatives are managing to vaccinate undocumented people despite a lack of inclusion at the policy-level; and there may also be cases where the opposite is true: policies may be clear and inclusive but practical barriers to access the vaccines in the real-life environment mean few undocumented people are vaccinated. 
        <br />
        <br />
        To correct for this, we tried to bring a practice-oriented point of view to complement the Scorecard results: 
        <br />
        <br />
        In collaboration with national outlets in several countries across Europe, we are publishing case-studies with a network of media partners including some of the most respected outlets on the continent. These stories combine ground reporting and human interest stories with the key findings from our data work to illustrate the real-life challenges the undocumented face. You can find a full list <a href="https://www.lighthousereports.nl/investigation/are-covid-vaccines-reaching-the-undocumented/">here</a> and do check back as this vital reporting resource is added to over the coming months. 
        <br />
        <br />
        For an immediate reality check on the Scorecard results, we asked national experts on undocumented migrants and access to health care for their point of view on a set of questions matching our five categories. Their responses, when available, are published next to the Scorecard results. The experts’ opinions are meant to provide a more balanced overall picture of vaccine access for undocumented people. 
        <br />
        <br />
        
        <h2>List of contributors</h2>
        The people listed below have been involved in the data collection and inputting processes. Without their work, this project would not have been possible. We are thankful to Paul Bradshaw and the Birmingham City University’s Data Journalism programme, who have been involved since the beginning of this project. Many of the volunteers listed below are part of the Data Journalism programme.  
        <br />
        <br />
        Andrei Popoviciu<br />
        Andrew Hillman<br />
        Beatriz Farrugia Foina<br />
        Claudia Ciobanu<br />
        Diana Fidarova<br />
        Edward Szekeres<br />
        Eleni Stamatoukou<br />
        Eva Luna Yperman <br />
        Gabriele Gatti<br />
        George<br />
        Willoughby<br />
        Jonathan<br />
        Touriño Jacobo<br />
        Kaili Malts<br />
        Louise Breusch Rasmussen<br />
        Niels de Hoog<br />
        Noemi Mena <br />
        Vanessa Fillis<br />
        <br />
        <br />
        The following people were also involved in the data collection and inputting processes. Because of a lack of time and language resources, the countries they were responsible for had to be left out of the final Scorecard. We are grateful for the initial work put into this project.
        <br />
        <br />
        Jelena Prtorić<br />
        Lasse Edfast<br />
        Orsolya Fazakas <br />
        <br />
        <br />
        Project coordination, data cleaning, additional research and data validation was carried out by the project team at Lighthouse Reports:
        <br />
        <br />
        Francesca Pierigh, Project Coordinator <br />
        Eva Constantaras, Data Editor<br />
        Htet Aung, Data Scientist<br />
        <br />
        <br />
        Additional in-house support came from:  
        <br />
        <br />
        Daniel Howden, Managing Director<br />
        Katerina Stravroula, Administrator<br />
        Fanis Kollias, Digital Producer<br />
        <br />
        <br />
        Design of the Scorecard by <a href="https://thibi.co/">Thibi</a>
        </p>
      </Container>
    </div>
  );
}

export default AboutPage;