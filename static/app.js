'use strict';
const menuButton = document.getElementById('menuButton');
const siteNav = document.getElementById('siteNav');
if (menuButton && siteNav) {
  menuButton.addEventListener('click', () => {
    const open = siteNav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });
  siteNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    siteNav.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false');
  }));
}
const projects = {
  'online-course': {category:'Instructional design',title:'Online Course Design',image:'/static/images/portfolio-online-course.jpg',description:'A SCORM-compliant certification program designed to make complex wellness education clear, relevant, and easy to complete.',details:[['Client','Universal Companies'],['Tools','Articulate 360, Adobe Suite'],['Outcome','35% completion increase']]},
  'moor-spa': {category:'Brand & product training',title:'Moor Spa',image:'/static/images/portfolio-moor-spa.png',description:'Branded product education that combines visual treatment protocols with a polished, professional learning experience.',details:[['Client','Moor Spa'],['Tools','Adobe InDesign, Canva'],['Deliverables','Training guides, digital assets']]},
  'safermobility': {category:'Content strategy',title:'SaferMobility',image:'/static/images/portfolio-safermobility.jpg',description:'Marketing collateral and an audience-centered content strategy for a campus safety platform serving university communities.',details:[['Client','SaferMobility'],['Tools','Canva, Adobe Suite, HubSpot'],['Focus','Brand voice, marketing content']]},
  'cnd-plexigel': {category:'Product education',title:'CND Plexigel',image:'/static/images/portfolio-cnd.jpg',description:'Clear, visual training materials that help nail professionals learn a complex product application with confidence.',details:[['Client','CND'],['Tools','Adobe Creative Suite'],['Deliverables','Visual protocols, training guides']]}
};
const dialog=document.getElementById('projectDialog'),closeDialog=document.getElementById('dialogClose');
function openProject(key){const p=projects[key];if(!p||!dialog)return;document.getElementById('dialogImage').src=p.image;document.getElementById('dialogImage').alt=p.title;document.getElementById('dialogCategory').textContent=p.category;document.getElementById('dialogTitle').textContent=p.title;document.getElementById('dialogDescription').textContent=p.description;document.getElementById('dialogDetails').innerHTML=p.details.map(([term,value])=>`<div><dt>${term}</dt><dd>${value}</dd></div>`).join('');dialog.showModal();}
document.querySelectorAll('[data-project]').forEach(card=>{card.addEventListener('click',()=>openProject(card.dataset.project));card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openProject(card.dataset.project)}})});
if(closeDialog)closeDialog.addEventListener('click',()=>dialog.close());
if(dialog)dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
