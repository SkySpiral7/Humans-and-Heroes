'use strict';

function PowerNameHtml(props)
{
   return (<label className="fill-remaining">
      Name&nbsp;<input type="text" id={props.sectionName + 'Name' + props.powerKey}
                       onChange={props.onChange} value={props.currentValue} /></label>);
}

function PowerSkillHtml(props)
{
   return (<label className="fill-remaining">
      Skill&nbsp;<input type="text" id={props.sectionName + 'Skill' + props.powerKey}
                        onChange={props.onChange} value={props.currentValue} /></label>);
}
