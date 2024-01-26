import anime from 'animejs/lib/anime.es.js';

document.addEventListener('DOMContentLoaded', () => {

  let aboutLink = document.querySelector('.menu-about')
  let communityLink = document.querySelector('.menu-community')
	let friedLink = document.querySelector('.menu-fried')
	let aboutHoverImg = document.querySelector('.menu-about span')
  let communityHoverImg = document.querySelector('.menu-community span')
  let friedHoverImg = document.querySelector('.menu-fried span')

  aboutLink.addEventListener('mouseenter', () => {
    anime.remove(aboutLink);
    anime({
      targets: aboutHoverImg,
      scale: 1.2,
      opacity: [0, 1],
      translateX: 100,
      easing: 'easeOutExpo',
    })
	})
	
	aboutLink.addEventListener('mouseleave', () => {
    anime.remove(aboutLink);
    anime({
      targets: aboutHoverImg,
			scale: 1,
			opacity: [1, 0],
      translateX: 9,
      easing: 'easeOutExpo',
    })
	})
	
	communityLink.addEventListener('mouseenter', () => {
    anime.remove(communityLink);
    anime({
      targets: communityHoverImg,
      scale: 1.4,
      opacity: [0, 1],
      translateY: 110,
      easing: 'easeOutExpo',
    })
	})
	
	communityLink.addEventListener('mouseleave', () => {
    anime.remove(communityLink);
    anime({
      targets: communityHoverImg,
			scale: 1,
			opacity: [1, 0],
      translateY: 0,
      easing: 'easeOutExpo',
    })
	})
	
	friedLink.addEventListener('mouseenter', () => {
    anime.remove(friedLink);
    anime({
      targets: friedHoverImg,
      scale: 1.2,
      opacity: [0, 1],
      translateY: -160,
      easing: 'easeOutExpo',
    })
	})
	
	friedLink.addEventListener('mouseleave', () => {
    anime.remove(friedLink);
    anime({
      targets: friedHoverImg,
			scale: 0.8,
			opacity: [1, 0],
      translateY: 0,
      easing: 'easeOutExpo',
    })
  })

})
