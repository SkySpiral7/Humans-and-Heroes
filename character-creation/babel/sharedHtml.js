'use strict';

/** @param props: sectionName, powerKey, onChange, currentValue */
function PowerNameHtml(props)
{
   return (<label className="fill-remaining">
      Name&nbsp;<input type="text" id={props.sectionName + 'Name' + props.powerKey}
                       onChange={props.onChange} value={props.currentValue} /></label>);
}

/** @param props: sectionName, powerKey, onChange, currentValue */
function PowerSkillHtml(props)
{
   return (<label className="fill-remaining">
      Skill&nbsp;<input type="text" id={props.sectionName + 'Skill' + props.powerKey}
                        onChange={props.onChange} value={props.currentValue} /></label>);
}
