import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import breakpoint from 'styled-components-breakpoint';

const AboutContainer = styled.div`
  padding: 0px 20px 20px 20px;
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  align-content: flex-start;
  flex-direction: column;
  `
const AboutHeader = styled.h1`
  font-size: 2em;
  ${breakpoint('mobile','desktop')`
    font-size: 1.5em;
  `}
  font-weight: bold;
  `
  AboutHeader.displayName = 'AboutHeader'
const AboutHeader2 = styled.h2`
  font-size: 1.5em;
  ${breakpoint('mobile','desktop')`
    font-size: 1em;
  `}  
  font-weight: bold;
  `
const AboutBody = styled.p`
  font-size: 1em;
  ${breakpoint('mobile','desktop')`
    font-size: 0.7em;
  `}  
  `

export default () => (
  <AboutContainer>
    <AboutHeader>DTU´s anbefalinger</AboutHeader>
    <AboutHeader2>DTU Energisystemanalyse-gruppens anbefalinger til en Klimaaftale</AboutHeader2>
    <AboutBody>
      Overordnet anbefaler vi at man sætter målsætningerne efter Paris-aftalens. Dvs. man skal have
      fastlagt et estimat på Danmarks kulstof-budget. Bruger man antagelserne bag TIMES-DK modellen vil
      det betyde at i 2030 skal CO 2 udledningen reduceres 70 % i forhold til 1990 eller en halvering i
      forhold til i dag. Vi anbefaler man frem mod 2030 går efter at overholde et kulstofbudget som svarer
      til et 2 graders scenario frem til 2030. Herefter må vi vurderer modenheden af teknologier, såsom
      CCS, elektrofuels og biofuels, for at kunne revurdere kulstof-budgettet til at opfylde et 1.5 grads
      scenarie.
    </AboutBody>
    <AboutHeader2>Anbefalinger til transportsektoren</AboutHeader2>
    <AboutBody>
      DTU anbefaler at man tænker internationalt skibs- og luftfart ind i den nationale planlægning i langt
      højere grad end i dag. Disse transportformer bidrager til den samlede CO2 udledning og skal derfor
      indregnes i det danske CO2 budget. Desuden er det vigtigt at inkludere dem i det fremtidige
      energisystem, da produktion af brændslerne som oftest har varme som biproduktion, der kan
      udnyttes i fjernvarmenettet osv. Desuden skal der tages højde for at biomassen er en begrænset
      ressource, der evt. skal bruges til disse transportformer.
    </AboutBody>
    <AboutBody>
      DTU arbejder på anbefalinger til et scenario for det danske energisystem, som kan vise en mulig vej
      mod et dansk bidrag til opfyldelse af Paris-aftalen.
    </AboutBody>
    <AboutBody><Link to='/'>Tilbage til forsiden</Link></AboutBody>
  </AboutContainer>
)