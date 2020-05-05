const isMobile = !!new MobileDetect(window.navigator.userAgent).mobile();

/**
* --------------------
* 指定された名前のタブを表示
* --------------------
**/

const showTab = (tabName) => {
  // すでに表示されている場合は何もせずに終了
  if ($(`#${tabName}`).is(':visible')) {
    return;
  }

  const tabsContainer = $(`a[href='#${tabName}']`).closest('.tabs');
  // .tabs__menu liのうちtabNameに該当するものにだけactiveクラスを付ける
  tabsContainer.find('.tabs__menu li')
  .removeClass('active');
  tabsContainer
    .find(`.tabs__menu a[href='#${tabName}']`)
    .parent('li')
    .addClass('active');

  // .tabs__contentの直下の要素をすべて非表示
  tabsContainer.find('.tabs__content > *').css({ display: 'none' });
  // #<tabName>と.tabs__content .<tabName>を表示
  tabsContainer
    .find(`#${tabName}, .tabs__content .${tabName}`)
    .css({
      display: 'block',
      opacity: 0.7,
    }).animate(
      {
        opacity: 1,
      },
      400)};

/**
* ------------------
* パララックス関連
* ------------------
*/

const parallaxXSpeed = 12;
const parallaxYSpeed = 3;
const parallaxXSpeedSmall = 5;
const parallaxYSpeedSmall = 1;

const showParallax = () => {
	const scrollTop = $(window).scrollTop();
	
	const offsetX = Math.round(scrollTop / parallaxXSpeed);
	const offsetY = Math.round(scrollTop / parallaxYSpeed);
	const offsetXSmall = Math.round(scrollTop / parallaxXSpeedSmall);
	const offsetYSmall = Math.round(scrollTop / parallaxYSpeedSmall);
	
	$('.puppies').css({
		'background-position':
		`${-offsetX}px ${-offsetY}px,${
		   offsetXSmall
	     }px ${-offsetYSmall}px, `
		+ '0% 0%',
	});
	
	$('.kittens').css({
		'background-position':
		`${-offsetX}px ${-offsetY}px,${
		   offsetXSmall
	     }px ${-offsetYSmall}px, `
		+ '0% 0%',
	});
};

const initParallax = () => {
	$(window).off('scroll', showParallax);
	
	if (!isMobile) {
		showParallax();
		$(window).on('scroll', showParallax);
	}
};

/**
* ------------------
* イベントハンドラの登録
* ------------------
*/

$('.animated').waypoint({
	handler(direction) {
		if (direction === 'down') {
			$(this.element).addClass('fadeInUp');
			this.destroy();
		}
	},
	offset: '100%',
});

$(window).on('resize', () => {
	initParallax();
});

$('.tabs__menu a').on('click', (e) => {
	const tabName = $(e.currentTarget).attr('href');
	
	e.preventDefault();
	
	if (tabName[0] === '#') {
		showTab(tabName.substring(1));
	}
});

$('.nav-link').on('click', (e) => {
	const destination = $(e.target).attr('href');
	
	e.preventDefault();
	
	$('html, body').animate(
	  {
		  scrollTop: $(destination).offset().top,
	  },
	  1000,
	);
	
	$('.navbar-toggler:visible').trigger('click');
});
// d-inline-blockクラスの付いた要素にMagnific Popupを適用
$('.d-inline-block').magnificPopup({
  type: 'image',
  gallery: { enabled: true },

  /**
   * ポップアップに適用されるクラス。
   * ここではフェードイン・アウト用のmfp-fadeクラスを適用。
   */
  mainClass: 'mfp-fade',

  // ポップアップが非表示になるまでの待ち時間
  removalDelay: 300,
});

if (isMobile) {
	$('.top__bg').css({
		'background-image': 'url(video/top-video-still.jpg)',
	});
} else {
	$('.top__video').css({ display: 'block' });
}

showTab('puppies-1');
showTab('kittens-1');

initParallax();