
import "semantic-ui-css/semantic.min.css";
import React, { useState, useEffect, useRef } from "react";
import { Container, Grid } from "semantic-ui-react";


function MethodologyPage(props) {

  return (
    <div className={'MethodologyPage'} >
      {/* <Grid container className="MainContainer">
        Methodology
      </Grid> */}
      <Container>
        <h1 className={"scoreCardPageHead"}>Methodology</h1>          
         
        <p>
        We developed the methodology in collaboration with experts on access to health for undocumented people, and data journalists and data scientists.
        <br />
        <br />
        Below is a short explanation of how we went about developing the Scorecards, from the data collection process, to data validation and analysis. If you would like to read a more in-depth explanation, and access the materials we used for the Scorecards, you can click <a href="https://github.com/Lighthouse-Reports/Vaccinating-the-Undocumented">here</a>. 
        </p>
        <h2>Data Collection</h2>
        <p>
          <a href='https://www.lighthousereports.nl/'>Lighthouse Reports</a>, in consultation with <a href='https://picum.org/'>PICUM</a> — an umbrella group for organisations providing assistance to and advocating for the rights of undocumented migrants in Europe — developed a Scorecard to assess the transparency and accessibility of the coronavirus vaccine to undocumented people in Europe and the United Kingdom, according to official national policies..
          <br />
          <br />
          To complete the Scorecard, Lighthouse Reports recruited volunteer researchers for each of the countries in the study. Most of the volunteers came from Birmingham University’s Masters’ in Data Journalism. Volunteers were selected based on their availability, language proficiency and previous experience and interest in collaborative data journalism projects. In a few cases, one volunteer was responsible for two countries.
          <br />
          <br />
          Researchers attended a virtual orientation session in which they were introduced to the project and scorecard methodology. The volunteers were responsible for collecting material for analysis, following the points below on the type of material needed: 
          <br />
          <ul>
            <li>Official vaccine policies, at the national level</li>
            <li>National vaccination implementation plans</li>
            <li>National vaccination registration website</li>
          </ul>
          This a non-exhaustive list of acceptable sources:<br />
          <ul>
            <li>Official national document: official vaccine policy, national implementation plan
            </li>
            <li>Other government communication: government press release, speech by authorities</li>
            <li>Parliamentary records, social media post from official government account</li>
            <li>Media: news items (print, online, TV, radio, ..)</li>
            <li>NGO: civil society organisation press release, statement, NGO information on</li>
            <li>Government policy</li>
            <li>Registration website: vaccine registration website</li>
            <li>Academic source: academic analysis of government policy or implementation</li>
          </ul>
          <br />
          &nbsp;&nbsp;This is a non-exhaustive list of materials to exclude:
          <ul>
            <li>Research reports
            </li>
            <li>Advocacy statements, press releases</li>
            <li>Unverified/Unofficial statements
            </li>
            <li>Statements that cannot be found online (eg. a TV statement which is untraceable)
            </li>
          </ul>
          <br />
          Volunteers collected all relevant material and registered it in a Google Sheet which is cleaned and stored <a href='https://github.com/Lighthouse-Reports/Vaccinating-the-Undocumented/blob/main/data/list_of_documents_used_for_national_scorecards.csv'> here </a>. This spreadsheet served as the basis for the data collection and inputting. All documents were given a country and number code to identify them. All materials were also collected in separate country Google Drive folders.
          <br />
          <br />
          Following document collection, volunteers were provided with the questions included in the questionnaire for analysis, and were asked to identify whether the documents they found were relevant for answering scorecard questions. They marked a document with Yes or No respectively.
          <br />
          <br />
          During a joint sprint session, the volunteers convened online with Eva Constantaras, Lighthouse Reports Data Editor, and Francesca Pierigh, Project Coordinator, for the data inputting sessions. Volunteers were asked to answer all questions to the best of their abilities, and doubts were addressed by the organisers. Upon completion of the questionnaires, volunteers were asked to double-check that all materials used to answer questions were appropriately marked as such in the Data Collection spreadsheet.
          <br />
          <br />
          Following the data inputting session, the data cleaning process took approximately two months and included a round of questions specifically targeted to each researcher. Cleaning steps included:
          <br />
          <ul>
            <li>Verifying that the answer, source document, document citation and research notes were consistent.</li>
            <li>Reformulating questions for clarity</li>
            <li>Refining and recoding question responses for clarity
            </li>
            <li>Supplementing responses with additional source material when available
            </li>
          </ul>
          <br />
          Following unavailability of three researchers, and lack of in-house language knowledge for those countries, three countries were dropped from the data cleaning process: Sweden, Hungary and Croatia.
          <br />
          <br />
          The data cleaning continued for the remaining 21 countries. This process led to the elimination of a number of questions, which were deemed so vague that responses were inconsistent or so specific that the majority of researchers were not able to provide answers. 
        </p>

        <br />
        <h2>Data Definitions and Properties</h2>
        <h3>Question Categories</h3>
        <p>Each question is grouped into exactly one of the following five categories, which are used for further analysis:</p>
        <ol>
          <li>Policy Transparency</li>
          <li>Undocumented Access</li>
          <li>Identification and Residency Requirements</li>
          <li>Marginalized Access</li>
          <li>Privacy Guarantees</li>
        </ol>

        <h3>Openness Questions</h3>
        <p>
        In addition to these five categories, 12 questions are marked to identify a country’s openness about the vaccine rollout policies. These openness questions are used to identify countries with not enough information for analysis and report.
        </p>
        <h3>Question ID</h3>
        <p>Questions are given a unique identifier of the form “T1” or “A5”. These identifiers do not bear any meaning for this project.</p>
        <h3>Response Options</h3>
        <p>There are a total of 4 possible responses: &#x7B;Yes, No, Unknown, NA&#x7D;. However, depending on the question, certain responses are not allowed. For example:</p>
        <ul>
          <li>“T1” can be responded with one of these options: &#x7B;Yes, No&#x7D;</li>
          <li>“A18” with: &#x7B;Yes, No, Unknown&#x7D;</li>
          <li>“A5” with: &#x7B;Yes, No, Unknown, NA&#x7D;</li>
          <li>And so on</li>
        </ul>
        <h2>Data Preprocessing</h2>
        <h3>Point System for Responses</h3>
        <p>Each possible response to each question is given a point system to convert qualitative code  &#x7B;Yes, No, Unknown, NA&#x7D; to a quantitative number. These points represent how good or bad the response is in relation to providing vaccines to the undocumented population. The following a snapshot of the point system:</p>
        <br />
        <table>
          <tr>
            <th></th>
            <th>T1</th>
            <th>A2</th>
            <th>T5</th>
          </tr>
          <tr>
            <td>Yes</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
          </tr>
          <tr>
            <td>No</td>
            <td>-1</td>
            <td>-2</td>
            <td>-1</td>
          </tr>
          <tr>
            <td>Unknowned</td>
            <td>Not Allowed</td>
            <td>-1</td>
            <td>-0.5</td>
          </tr>
          <tr>
            <td>NA</td>
            <td>Not Allowed</td>
            <td>-1</td>
            <td>Not Allowed</td>
          </tr>
        </table>

        <br />
        <h3>Question Importance Scale</h3>
        <p>
        In addition to the point system, each question is given an importance from &#x7B;not so important, important, very important&#x7D;, based on how impactful these questions are to the overall score of each country.
        <br />
        <br />
        The importance value is mapped so that &#x7B;not so important, important, very important&#x7D; are weighted at &#x7B;0.5, 1.0, 1.5&#x7D;, respectively.
        </p>
        <h2>Data Validity Tests</h2>
        <p>
        A few tests are run on the collected and processed data to test the reliability, validity and internal consistency within the dataset.
        <br />
        <br />
        Inter-item correlation is tested on all categories. As expected, all semantically related questions are correlated as expected while non-related questions do not show any correlation. Interrelated questions show great reliability as they scored correlations between 0.6 and 0.99.
        <br />
        <br />
        Cronbach’s Alpha is also calculated to test the internal consistency of the dataset. The Cronbahc’s Alpha value of 0.729 indicates that the internal consistency of the dataset is good for exploratory research.
        <br />
        <br />
        For validity test, the trends in the dataset is also roughly compared with the results shown in <a href='https://picum.org/covid-19-vaccines-undocumented-migrants-europe/'>The COVID-19 Vaccines and Undocumented Migrants: What Are European Countries Doing? </a>. After converting PICUM ratings to number scale, PICUM scores and our country scores show a strong statistically significant correlation, which provides additional validity to our dataset.

        </p>

        <h2>Data Analysis</h2>
        <p>Several types of analysis are run on the dataset: cluster analysis, similarity between country pairs, statistical distributions, and correlation analysis with scatter plots.</p>

        <h2>Appendix</h2>
        <p>
        <a href="https://github.com/Lighthouse-Reports/Vaccinating-the-Undocumented/blob/main/data/list_of_documents_used_for_national_scorecards.csv">List of Sources Referenced</a> and the <a href="https://github.com/Lighthouse-Reports/Vaccinating-the-Undocumented/blob/main/data/codebook.md">Descriptions</a> (for description, please see the section “list_of_documents_used_for_national_scorecards.csv”)
        <br />
        <br />
        <a href="https://github.com/Lighthouse-Reports/Vaccinating-the-Undocumented/blob/main/output/main_data.csv">Processed Data</a> and the <a href="https://github.com/Lighthouse-Reports/Vaccinating-the-Undocumented/blob/main/output/codebook.md">Descriptions</a>
        </p>

        <p>
        One key analysis that we have used in this analysis is dividing countries into confused, low score and high score groups. These groupings take precedence in the order given below:
        </p>
        <ol>
          <li>Confused (for total score): A country is classified as “confused” overall if the overall confidence score of the country is in the below 50-percentile.</li>
          <li>Confused: A country is classified as “confused” in a given category (this is one of the five categories or the total score) if the confidence score of the country in that category is less than 0.5, regardless of the aggregate score for that category.</li>
          <li>Low score: A country is classified as “low score” in a given category if the score for that country in that category is below 50 percentile.</li>
          <li>High score: A country is classified as “high score” in a given category if the score for that country in that category is above 50 percentile.</li>
        </ol>

        <p>
        The confused classification has 2 approaches due to the limited number of questions in the category “Identification and Residency Requirements” which contains only 2 questions. This makes it technically impossible to use the percentile approach to classify the countries into the confused category. On the other hand, using the percentile approach when there’s enough data points is preferable. Therefore the overall confidence score is grouped by using percentile approach.
        <br />
        <br />
        These groupings help us define which countries are unclear about their policies, which are clear but exclusionary and which are clear and inclusive of the undocumented population.
        </p>
      </Container>
    </div>
  );
}

export default MethodologyPage;