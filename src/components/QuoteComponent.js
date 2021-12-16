import React, { useState, useRef, useEffect } from 'react';
import { colors, getColor, getBackgroundColor, paddings, questionBar, medianBar, 
  catInitials, scoreCardCircleRadii, medianMarker, blankAnswer, quoteInfo } from '../helpers/constants';
import { scaleLinear, scaleBand } from 'd3-scale';
import { range, max } from 'd3-array';
import { Button, Card, CardContent, Modal } from 'semantic-ui-react';
import CardShareWidget from './CardShareWidget';
import { useTranslation } from 'react-i18next';

function Quote(props) {
  const { data, shareRoute } = props;
  const [open, setOpen] = React.useState(false);
  // console.log(shareRoute);

  const { t, i18n } = useTranslation();

  const commentShort = data.Comment 
    ? '"' + data.Comment.split(" ").slice(0,quoteInfo.numWords).join(" ") 
      + (data.Comment.split(" ").length > quoteInfo.numWords ? ' ...' : '')
      +'"'
    : ""

  const answerClass = data.RangeEquivalent[0] === "+"
    ? "good" 
    : data.RangeEquivalent[0] === "-" ? "bad" : "neutral"

  return (
    <Card className={"quoteCard"}>
      <Card.Content className={"quoteCardContent"}>
        <Card.Header className={"quoteCardHeader"}>
          {
            data.CategoryDetail
            ? data.CategoryDetail
            : t("Expert Opinion")
          }
        </Card.Header>
        {/* {
          data.Question
          ? <Card.Description>
              Question:
            </Card.Description>
          : null
        } */}
        {
          data.Question
          ? <Card.Description  className={"quoteCardQuestion"}>
              {data.Question}
            </Card.Description>
          : null
        }
        {/* {
          data.Answer
          ? <Card.Description>
            Answer:
          </Card.Description>
          : null
        } */}
        {
          data.Answer
          ? <Card.Description  className={"quoteCardAnswer " + answerClass}>
            {data.Answer}
          </Card.Description>
          : null
        }
        {/* {
          commentShort
          ? <Card.Description>
              Quote:
            </Card.Description>
          : null
        } */}
        {
          commentShort
          ? <Card.Description className={"quoteCardQuote"}>
              <p>{commentShort}</p> 
            </Card.Description>
          : null
        }
        <Modal
          centered={false}
          open={open}
          size='small'
          className={"quoteCard"}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          trigger={<Button basic size='tiny'>{t("Read more")}</Button>}
        >
          <Modal.Header className={"quoteCardHeader"}>
            {t("Expert Opinion")}
          </Modal.Header>
          <Modal.Content className={"quoteCardContent"}>
            {/* {
            data.Question
            ? <Modal.Description >
                Question:
              </Modal.Description>
              : null 
            } */}
            {
              data.Question
              ? <Modal.Description  className={"quoteCardQuestion"}>
                  {data.Question}
                </Modal.Description>
              : null
            }
            {/* {
              data.Answer
              ? <Modal.Description>
                Answer:
              </Modal.Description>
              : null
            } */}
            { 
              data.Answer
              ? <Modal.Description  className={"quoteCardAnswer " + answerClass}>
                  {data.Answer}
                </Modal.Description>
              : null
            }
            {/* {
              data.Comment
              ? <Modal.Description>
                  Quote:
                </Modal.Description>
              : null
            } */}
            {
              data.Comment
              ? <Modal.Description  className={"quoteCardQuote"}>
                  "{data.Comment}"
                </Modal.Description>
              : null
            }

            <Modal.Description  className={"quoteCardPerson"}>
              <p>{data.PersonName}<br/>
              {data.PersonQualification}</p>
            </Modal.Description>

            <Modal.Description >
              <hr color={"#ddd"}/>
              <p> {data.PersonBio}<br/></p>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={() => setOpen(false)}>{t("Close")}</Button>
          </Modal.Actions>
        </Modal>
        {/* <Card.Description className={"quoteCardReadMore"}>
        </Card.Description> */}
        <Card.Description className={"quoteCardPerson"}>
          <p>{data.PersonName}<br/>
          {data.PersonQualification}</p>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <CardShareWidget shareRoute={shareRoute}/>
      </Card.Content>

    </Card>

  )

}

export default Quote;