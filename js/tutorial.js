/* [?] My Time Organizer @ Google Apps Hackathon 12.11.2011 (11/12/2011)
 * [+] Authors: 
 * - Dominik Galewski (mug3tsu)
 * - Sebastian Krzyszkowiak (dos)
 * - Krzysztof Marciniak (hun7er)
 * [!] [alphabetical order]
 */


function end() {
	$('#tutorial').fadeOut(500, function() { $('#tutorial').remove();  });
	$('#tutorialHighlight').css("display", "none");
	$('#helper').css("visibility", "visible");
}

function fourth() {
	
	$("#tutorialAddon").remove();
	slideTo(moment());
	elem = $('#info_panel');
	elem.attr('data-expand','false');

	elem = $('#help_btn');
	$('#tutorialHighlight').animate({height: 0, width: 0, top: window.innerHeight/2, left: window.innerWidth/2}, 500);

	$("#tutorialText").html("My Time Organizer ma przede wszystkim ułatwiać życie użytkownikom, dlatego staramy się słuchać ich opinii i pomysłów. Aby w przyszłości przekazać nam, autorom aplikacji, wiadomość odnośnie aplikacji, kliknij na przycisk pomocy. Ten sam przycisk umożliwi Ci również ponowne wyświetlenie tego samouczka.<br/><br/>I to by było na tyle!");
	$('#tutorial').animate({top: window.innerHeight/2, left: window.innerWidth/2}, {duration: 1000, queue: false}).css('transform','translate(-200px,-50px)');
	$("#tutorialNext").html("Zakończ");
	$('#tutorialNext')[0].onclick = null;	
	$("#tutorialNext")[0].onclick = end;
}

function expand() {
	elem = $('#info_panel');
	elem.attr('data-expand','true');
	$("#tutorialAddon").remove();
	
	wrap = document.createElement('img');
	wrap.id = 'tutorialAddon';
	wrap.src = 'images/keyboard.png';
	$(wrap).css('text-align', 'center').css('marginLeft','20px').css('marginTop','20px');
	$(wrap).insertAfter($('#tutorialNext'));
	
	$("#tutorialText").html("Aby przemieszczać się między poszczególnymi tygodniami, możesz najechać myszką na numer tygodnia wskazany powyżej albo kliknąć na przycisk ze strzałką znajdujący się na boku ekranu. Pierwsza ikonka pozwoli Ci wybrać interesującą Cię datę, druga zaś - przeniesie do obecnego tygodnia.<br/><br/>Dodatkowo możesz skorzystać ze sterowania klawiaturą zgodnie ze schematem poniżej.");
	$('#tutorial').animate({top: elem.offset().top+30, left: (elem.offset().left+parseInt(elem.css('width')))-parseInt($('#tutorial').css('width'))}, 1);
	$('#tutorialNext')[0].onclick = null;	
	$('#tutorialNext')[0].onclick = fourth;
	$('#tutorial').fadeIn(500);
}

function third() {
	
	var notes=$("#tutorialAddon").children(".day_content").children();
	//console.log(notes);
	for (i=0; i<notes.length; i++) {
		$("#"+$(notes[i]).attr('data-colorpickerId')).remove();
	}
	$('#event_edit_panel').fadeOut(500);
	$('#tutorial').fadeOut(500);
	elem = $('#left_arrow');
	$('#tutorialHighlight').animate({height: parseInt(elem.css('height'))+60, width: parseInt(elem.css('width'))+35, top: elem.offset().top-5, left: elem.offset().left}, 1000);
	elem = $('#right_arrow');
	$('#tutorialHighlight').delay(500).animate({height: parseInt(elem.css('height'))+60, width: parseInt(elem.css('width'))+35, top: elem.offset().top-5, left: elem.offset().left}, 1000);

	elem = $('#info_panel');
	$('#tutorialHighlight').delay(500).animate({height: parseInt(elem.css('height'))+10, width: parseInt(elem.css('width'))+40, top: elem.offset().top-2, left: elem.offset().left-16}, 1000, expand);
}

function secondText() {
	$('#tutorialText').html("Po najechaniu myszką na notatkę, zadanie lub wydarzenie wysuwa się panel kontrolny, umożliwiający edycję tekstu, wprowadzanie głosowe, zmianę koloru paska, przemieszczenie elementu do innego dnia lub usunięcie go.<br/><br/>Panel pojawi się również w notatkach umieszczonych w kolumnie obok. Śmiało, wypróbuj go!");	
	$('#tutorialNext')[0].onclick = null;	
	$('#tutorialNext')[0].onclick = third;
}

function second() {
	var notes=$("#tutorialAddon").children(".day_content").children();
	if (notes.length==0) {
			var note = document.createElement('div');
			$(note).addClass('note');
			note.setAttribute('data-content', '');
			note.setAttribute('data-bgcolor', '#5b5b5b');
			
			fillNote(note);
			$(note).appendTo("#tutorialAddon .day_content");
	}
	$('#tutorialText').fadeOut(500, secondText).fadeIn(500);
}

function first() {
	$('#tutorial').css("-webkit-transform","none").css('left', $('#tutorial').offset().left+200).css('top', $('#tutorial').offset().top+50);

	wrap = document.createElement('div');
	wrap.id = 'tutorialAddon';
	$(wrap).css('float', 'left').css('width', '150px').css('height','225px').css('margin-right', '10px').css('background-color','whiteSmoke');
	$(wrap).insertBefore($('#tutorialText'));
	
	next = document.createElement('div');
	$(next).addClass('day_content').css('height','100%').css('width','100%').css('margin',0);
	$(next).appendTo(wrap);

	setDayHandlers(next);
	
	$("#tutorialText").html("My Time Organizer pozwala na zorganizowanie dnia przy pomocy trzech podstawowych typów elementów: wydarzeń, zadań oraz notatek. Dodawanie ich do wybranego dnia odbywa się na prostej zasadzie \"przeciągnij i upuść\".<br/><br/>Możesz wypróbować ten mechanizm na kolumnie obok. Najedź kursorem na wybrany przycisk, wciśnij lewy przycisk myszki, przesuń kursor na kolumnę po czym puść przycisk.");
	elem = $('#add_panel');
	$('#tutorial').animate({top: elem.offset().top+70, left: elem.offset().left}, 1000);
	
	$('#tutorialHighlight').animate({height: parseInt(elem.css('height'))+60, width: parseInt(elem.css('width'))+50, top: elem.offset().top-50, left: elem.offset().left-40}, 1000);

	$('#tutorialNext')[0].onclick = null;	
	$('#tutorialNext')[0].onclick = second;
}

//$(document).ready(function() {
function tutorialStart() {
	
	if ($('body').attr('data-view')=='month') toggleView();
	
	$('#tutorial').remove();
	$('#helper').css("visibility", "hidden");
	//$('#tutorialHighlight').animate({height: 500, width: 30, top: 10, left: 10}, 5000, first);
	okno = document.createElement('div');
	okno.id = 'tutorial';
	okno = $(okno);
	okno.hide();
	okno.addClass('helper');
	okno.empty();
	okno.css("z-index", 100000);
	
	text = document.createElement('div');
	text.id = 'tutorialText';
	text = $(text);
	text.html("Witaj w My Time Organizer! Ten samouczek pomoże Ci zapoznać się z funkcjami i zasadami działania aplikacji.");
	text.appendTo(okno);
	
	next = document.createElement('div');
	next.id = 'tutorialNext';
	$(next).addClass('next_button');
	next.innerHTML = 'Dalej';
	next.onclick = first;
	$(next).appendTo(okno);
	
	okno.appendTo("body");
	okno.fadeIn(500);
	
	$('#tutorialHighlight').css('display','block').css('left', $('#tutorialHighlight').offset().left).css('top', $('#tutorialHighlight').offset().top);
}

function fillAboutApp() {
	content = document.createElement('div');
	content = $(content);
	content.html('<p>My Time Organizer '+__VERSION__+'</p><p>Autorzy:</p><ul><li>Dominik \'mug3tsu\' Galewski</li><li>Sebastian \'dos\' Krzyszkowiak</li><li>Krzysztof \'hun7er\' Marciniak</li></ul><p>Użyte biblioteki:</p><ul><li>jQuery</li><li>jQuery CSS Transform</li><li>jQuery Animate CSS Rotate&amp;Scale</li><li>jQuery Animate Shadow</li><li>jQuery Colorpicker</li><li>jQuery Datepicker</li><li>moment.js</li></ul><p>Z podziękowaniami dla Poznań GTUG, którego hackaton umożliwił powstanie tej aplikacji oraz dla Nyan Cata, którego tęczowa moc napędza najbardziej mistyczne fragmenty kodu.');
	content.find('p').css('padding-top', 20);
	content.find('li').css('list-style-type','disc').css('margin-left', 20);
	content.appendTo('#tutorial');
	
	
	next = document.createElement('div');
	$(next).addClass('next_button');
	next.innerHTML = 'Zamknij';
	next.onclick = end;
	$(next).css('width','100%').appendTo(content);

	
	content.hide();
	content.fadeIn(500);
	//setTimeout(end, 5000);
}

function aboutApp() {
	$("#tutorial").children().fadeOut(500, fillAboutApp);
	$("#tutorial").css('top',$("#tutorial").offset().top).css('left',$("#tutorial").offset().left+200).css('transform','none').animate({width: 400, top: window.innerHeight/2 - 200, left: window.innerWidth/2 - 200},1000);
}


function fillContactForm() {
	content = document.createElement('div');
	content.id = 'contactForm';
	content = $(content);
	content.html('<form method="POST" onsubmit="end()" action="http://dosowisko.net/mto/contact/" target="_blank"><p>Przy pomocy tego formularza możesz wysłać wiadomość do twórców aplikacji My Time Organizer.</p><p>Gorąco zachęcamy do wysyłania nam opinii, raportów o błędach oraz pomysłów na ulepszenie naszej aplikacji!</p><p>Jeżeli chcesz, abyśmy Ci odpisali, możesz podać swój adres e-mail w polu do tego przeznaczonym.</p><input type="text" name="title" placeholder="Tytuł wiadomości..." /><textarea name="content" required placeholder="Treść wiadomości..." /><input name="mail" type="email" placeholder="Twój adres e-mail (opcjonalnie)" /><p>Przed wysłaniem wiadomości upewnij się, że komputer jest połączony z Internetem.</p><input type="submit" value="Wyślij" /><input type="button" value="Anuluj" onclick="end()"/></form>');
	content.css('padding-top', 20);
	content.find('input[type="text"], input[type="email"], textarea').css('width', '100%').css('-webkit-box-sizing', 'border-box').css('max-width','100%').css('min-width','100%');
	content.find('textarea').css('height', '150px').css('min-height', '150px').css('max-height', '150px');
	content.find('input[type="submit"], input[type="button"]').css('-webkit-box-sizing', 'border-box').css('width','50%');
	$(content.find('p').css('margin-top', 5).css('margin-bottom', 5)[0]).css('margin-top',0);
	content.appendTo('#tutorial');
	content.hide();
	content.fadeIn(500);
	//setTimeout(end, 5000);
}

function contactForm() {
	$("#tutorial").children().fadeOut(500, fillContactForm);
	$("#tutorial").css('top',$("#tutorial").offset().top).css('left',$("#tutorial").offset().left+200).css('transform','none').animate({width: 400, height: 400, top: window.innerHeight/2 - 200, left: window.innerWidth/2 - 200},1000);
}

function helpScreen() {
	$('#helperTutorialFirstRun').remove();
	localStorage['firstRunBubbleHidden']=true;
	
	if (!(localStorage['tutorialFirstTimePassed'])) { localStorage['tutorialFirstTimePassed']=true; tutorialStart(); return true; }
	
	$('#helper').css("visibility", "hidden");
	
	//$('#tutorialHighlight').animate({height: 500, width: 30, top: 10, left: 10}, 5000, first);
	okno = document.createElement('div');
	okno.id = 'tutorial';
	okno = $(okno);
	okno.hide();
	okno.addClass('helper');
	okno.empty();
	okno.css("z-index", 100000).css('width',200).css('padding-top',0);
		
	wrap = document.createElement('div');
	
	next = document.createElement('div');
	$(next).addClass('next_button');
	next.innerHTML = 'Samouczek';
	next.onclick = tutorialStart;
	$(next).css('width','100%').appendTo(wrap);

	next = document.createElement('div');
	$(next).addClass('next_button');
	next.innerHTML = 'Kontakt';
	next.onclick = contactForm;
	$(next).css('width','100%').appendTo(wrap);

	next = document.createElement('div');
	$(next).addClass('next_button');
	next.innerHTML = 'O programie';
	next.onclick = aboutApp;
	$(next).css('width','100%').appendTo(wrap);
	
	next = document.createElement('div');
	$(next).addClass('next_button');
	next.innerHTML = 'Anuluj';
	next.onclick = end;
	$(next).css('width','100%').appendTo(wrap);

	$(wrap).appendTo(okno);
	
	okno.appendTo("body");
	okno.fadeIn(500);
	
	$('#tutorialHighlight').css('display','block').css('left', $('#tutorialHighlight').offset().left).css('top', $('#tutorialHighlight').offset().top);
	//first();
}

//);
