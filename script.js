/* ===========================
   script.js — jQuery interactions
=========================== */

$(document).ready(function () {

  /* ── 1. NAV scroll effect ── */
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 40) {
      $('nav').addClass('scrolled').css('background', 'rgba(13,13,13,0.97)');
    } else {
      $('nav').removeClass('scrolled').css('background', 'rgba(13,13,13,0.9)');
    }
  });

  /* ── 2. Hamburger menu ── */
  $('.hamburger').on('click', function () {
    $('.nav-links').toggleClass('open');
    $(this).toggleClass('active');
  });

  // Close menu on nav link click
  $('.nav-links a').on('click', function () {
    $('.nav-links').removeClass('open');
    $('.hamburger').removeClass('active');
  });

  /* ── 3. Active nav link on scroll ── */
  const sections = $('section[id], div[id]');
  $(window).on('scroll', function () {
    let scrollPos = $(this).scrollTop() + 100;
    sections.each(function () {
      let top = $(this).offset().top;
      let bottom = top + $(this).outerHeight();
      let id = $(this).attr('id');
      if (scrollPos >= top && scrollPos < bottom) {
        $('.nav-links a').removeClass('active').css('color', '');
        $(`.nav-links a[href="#${id}"]`)
          .addClass('active')
          .css('color', 'var(--accent)');
      }
    });
  });

  /* ── 4. Reveal on scroll (Intersection Observer via jQuery fallback) ── */
  function revealOnScroll() {
    $('.reveal').each(function () {
      let top = $(this).offset().top;
      let windowBottom = $(window).scrollTop() + $(window).height();
      if (windowBottom > top + 60) {
        $(this).addClass('visible');
      }
    });
  }
  $(window).on('scroll', revealOnScroll);
  revealOnScroll(); // initial check

  /* ── 5. Skill bar animation (jQuery trigger on scroll) ── */
  let skillsAnimated = false;

  function animateSkills() {
    let skillsTop = $('#skills').offset().top;
    let windowBottom = $(window).scrollTop() + $(window).height();

    if (!skillsAnimated && windowBottom > skillsTop + 100) {
      skillsAnimated = true;

      $('.skill-fill').each(function () {
        let target = $(this).data('width');
        $(this).animate({ width: target + '%' }, {
          duration: 1200,
          easing: 'swing',
          step: function (now) {
            // update the sibling percentage display
            $(this).closest('.skill-item')
              .find('.skill-pct')
              .text(Math.round(now) + '%');
          }
        });
      });
    }
  }

  $(window).on('scroll', animateSkills);
  animateSkills();

  /* ── 6. Formation accordion ── */
  $('.formation-header').on('click', function () {
    let $item = $(this).closest('.formation-item');
    let $body = $item.find('.formation-body');
    let isOpen = $item.hasClass('open');

    // Close all
    $('.formation-item').removeClass('open');
    $('.formation-body').slideUp(300);

    // Open clicked if it was closed
    if (!isOpen) {
      $item.addClass('open');
      $body.slideDown(300);
    }
  });

  // Open first by default
  $('.formation-item:first-child').find('.formation-header').trigger('click');

  /* ── 7. Hover glow on project cards ── */
  $(document).on('mouseenter', '.project-card', function () {
    $(this).css('box-shadow', '0 20px 40px rgba(232,197,71,0.1)');
  }).on('mouseleave', '.project-card', function () {
    $(this).css('box-shadow', '');
  });

  /* ── 8. Smooth scroll for anchor links ── */
  $('a[href^="#"]').on('click', function (e) {
    let target = $($(this).attr('href'));
    if (target.length) {
      e.preventDefault();
      $('html, body').animate({
        scrollTop: target.offset().top - 64
      }, 600, 'swing');
    }
  });

});
