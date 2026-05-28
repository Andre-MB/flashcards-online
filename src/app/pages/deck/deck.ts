import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlashcardComponent } from '../../components/flashcard/flashcard';

interface Card {
  id: number;
  question: string;
  answer: string;
  level: number;
  nextReview: number;
}

@Component({
  selector: 'app-deck',
  standalone: true,
  templateUrl: './deck.html',
  styleUrls: ['./deck.css'],
  imports: [FlashcardComponent],
})
export class Deck {
  deckId: string | null = null;

  flashcards: Card[] = [
    { id: 1, question: 'the', answer: 'o, a', level: 0, nextReview: 0 },
    { id: 2, question: 'be', answer: 'ser, estar', level: 0, nextReview: 0 },
    { id: 3, question: 'and', answer: 'e', level: 0, nextReview: 0 },
    { id: 4, question: 'of', answer: 'de', level: 0, nextReview: 0 },
    { id: 5, question: 'a', answer: 'um, uma', level: 0, nextReview: 0 },
    { id: 6, question: 'in', answer: 'em', level: 0, nextReview: 0 },
    { id: 7, question: 'to', answer: 'para', level: 0, nextReview: 0 },
    { id: 8, question: 'have', answer: 'ter', level: 0, nextReview: 0 },
    { id: 9, question: 'it', answer: 'isso, ele, ela', level: 0, nextReview: 0 },
    { id: 10, question: 'that', answer: 'aquele, aquilo', level: 0, nextReview: 0 },
    {
      id: 597,
      question: 'You will be',
      answer: 'Você será / Você estará',
      level: 0,
      nextReview: 0,
    },
    { id: 598, question: 'He will be', answer: 'Ele será / Ele estará', level: 0, nextReview: 0 },
    { id: 599, question: 'She will be', answer: 'Ela será / Ela estará', level: 0, nextReview: 0 },
    { id: 600, question: 'It will be', answer: 'Isso será / Isso estará', level: 0, nextReview: 0 },
    { id: 601, question: 'How are you?', answer: 'Como você está?', level: 0, nextReview: 0 },
    {
      id: 602,
      question: 'What is your name?',
      answer: 'Qual é o seu nome?',
      level: 0,
      nextReview: 0,
    },
    {
      id: 603,
      question: 'Where are you from?',
      answer: 'De onde você é?',
      level: 0,
      nextReview: 0,
    },
    {
      id: 604,
      question: 'How old are you?',
      answer: 'Quantos anos você tem?',
      level: 0,
      nextReview: 0,
    },
    { id: 605, question: 'What time is it?', answer: 'Que horas são?', level: 0, nextReview: 0 },
    { id: 606, question: 'Can I help you?', answer: 'Posso ajudá-lo?', level: 0, nextReview: 0 },
    {
      id: 607,
      question: 'I don’t know what to do',
      answer: 'Eu não sei o que fazer',
      level: 0,
      nextReview: 0,
    },
    { id: 608, question: 'I have no idea', answer: 'Eu não faço ideia', level: 0, nextReview: 0 },
    {
      id: 609,
      question: 'What do you mean?',
      answer: 'O que você quer dizer?',
      level: 0,
      nextReview: 0,
    },
    { id: 610, question: 'I agree', answer: 'Eu concordo', level: 0, nextReview: 0 },
    { id: 611, question: 'I disagree', answer: 'Eu discordo', level: 0, nextReview: 0 },
    { id: 612, question: 'It doesn’t matter', answer: 'Não importa', level: 0, nextReview: 0 },
    { id: 613, question: 'That sounds good', answer: 'Isso parece bom', level: 0, nextReview: 0 },
    { id: 614, question: 'I think so', answer: 'Eu acho que sim', level: 0, nextReview: 0 },
    { id: 615, question: 'I don’t think so', answer: 'Eu não acho', level: 0, nextReview: 0 },
    {
      id: 616,
      question: 'What do you think?',
      answer: 'O que você acha?',
      level: 0,
      nextReview: 0,
    },
    { id: 617, question: 'That’s right', answer: 'Está certo', level: 0, nextReview: 0 },
    { id: 618, question: 'That’s wrong', answer: 'Está errado', level: 0, nextReview: 0 },
    { id: 619, question: 'I’m tired', answer: 'Estou cansado/cansada', level: 0, nextReview: 0 },
    { id: 620, question: 'I’m hungry', answer: 'Estou com fome', level: 0, nextReview: 0 },
    { id: 621, question: 'I’m thirsty', answer: 'Estou com sede', level: 0, nextReview: 0 },
    { id: 622, question: 'I’m happy', answer: 'Estou feliz', level: 0, nextReview: 0 },
    { id: 623, question: 'I’m sad', answer: 'Estou triste', level: 0, nextReview: 0 },
    {
      id: 624,
      question: 'I’m bored',
      answer: 'Estou entediado/entediada',
      level: 0,
      nextReview: 0,
    },
    { id: 625, question: 'Let’s go', answer: 'Vamos', level: 0, nextReview: 0 },
    { id: 626, question: 'Come here', answer: 'Venha aqui', level: 0, nextReview: 0 },
    { id: 627, question: 'Go away', answer: 'Vá embora', level: 0, nextReview: 0 },
    { id: 628, question: 'Sit down', answer: 'Sente-se', level: 0, nextReview: 0 },
    { id: 629, question: 'Stand up', answer: 'Levante-se', level: 0, nextReview: 0 },
    { id: 630, question: 'Be careful', answer: 'Tenha cuidado', level: 0, nextReview: 0 },
    { id: 631, question: 'Watch out', answer: 'Cuidado!', level: 0, nextReview: 0 },
    { id: 632, question: 'Don’t worry', answer: 'Não se preocupe', level: 0, nextReview: 0 },
    { id: 633, question: 'Good job', answer: 'Bom trabalho', level: 0, nextReview: 0 },
    { id: 634, question: 'Well done', answer: 'Muito bem', level: 0, nextReview: 0 },
    { id: 635, question: 'That’s amazing', answer: 'Isso é incrível', level: 0, nextReview: 0 },
    {
      id: 636,
      question: 'I’m sorry to hear that',
      answer: 'Sinto muito ouvir isso',
      level: 0,
      nextReview: 0,
    },
    {
      id: 637,
      question: 'I hope you feel better',
      answer: 'Espero que você se sinta melhor',
      level: 0,
      nextReview: 0,
    },
    { id: 638, question: 'It’s up to you', answer: 'Depende de você', level: 0, nextReview: 0 },
    { id: 639, question: 'I can’t wait', answer: 'Não vejo a hora', level: 0, nextReview: 0 },
    { id: 640, question: 'Take your time', answer: 'Não tenha pressa', level: 0, nextReview: 0 },
    {
      id: 641,
      question: 'It doesn’t matter',
      answer: 'Não faz diferença',
      level: 0,
      nextReview: 0,
    },
    { id: 642, question: 'That’s enough', answer: 'Isso é suficiente', level: 0, nextReview: 0 },
    { id: 643, question: 'No problem', answer: 'Sem problema', level: 0, nextReview: 0 },
    { id: 644, question: 'Of course', answer: 'Claro', level: 0, nextReview: 0 },
    { id: 645, question: 'I’m afraid', answer: 'Receio que', level: 0, nextReview: 0 },
    { id: 646, question: 'I’m not sure', answer: 'Não tenho certeza', level: 0, nextReview: 0 },
    { id: 647, question: 'Maybe', answer: 'Talvez', level: 0, nextReview: 0 },
    { id: 648, question: 'I hope so', answer: 'Espero que sim', level: 0, nextReview: 0 },
    { id: 649, question: 'I hope not', answer: 'Espero que não', level: 0, nextReview: 0 },
    { id: 650, question: 'It depends', answer: 'Depende', level: 0, nextReview: 0 },
    {
      id: 651,
      question: 'As soon as possible',
      answer: 'O mais rápido possível',
      level: 0,
      nextReview: 0,
    },
    { id: 652, question: 'Once in a while', answer: 'De vez em quando', level: 0, nextReview: 0 },
    { id: 653, question: 'By the way', answer: 'A propósito', level: 0, nextReview: 0 },
    { id: 654, question: 'In fact', answer: 'De fato', level: 0, nextReview: 0 },
    { id: 655, question: 'For example', answer: 'Por exemplo', level: 0, nextReview: 0 },
    { id: 656, question: 'As usual', answer: 'Como de costume', level: 0, nextReview: 0 },
    { id: 657, question: 'At least', answer: 'Pelo menos', level: 0, nextReview: 0 },
    { id: 658, question: 'In general', answer: 'Em geral', level: 0, nextReview: 0 },
    { id: 659, question: 'On time', answer: 'No horário', level: 0, nextReview: 0 },
    {
      id: 660,
      question: 'Out of time',
      answer: 'Fora do tempo / Sem tempo',
      level: 0,
      nextReview: 0,
    },
    { id: 661, question: 'All of a sudden', answer: 'De repente', level: 0, nextReview: 0 },
    { id: 662, question: 'As soon as', answer: 'Assim que', level: 0, nextReview: 0 },
    { id: 663, question: 'I mean', answer: 'Quero dizer', level: 0, nextReview: 0 },
    { id: 664, question: 'In my opinion', answer: 'Na minha opinião', level: 0, nextReview: 0 },
    { id: 665, question: 'On the other hand', answer: 'Por outro lado', level: 0, nextReview: 0 },
    { id: 666, question: 'At first', answer: 'No começo', level: 0, nextReview: 0 },
    { id: 667, question: 'In the end', answer: 'No final', level: 0, nextReview: 0 },
    { id: 668, question: 'As far as I know', answer: 'Até onde eu sei', level: 0, nextReview: 0 },
    { id: 669, question: 'No way', answer: 'De jeito nenhum', level: 0, nextReview: 0 },
    { id: 670, question: 'You never know', answer: 'Você nunca sabe', level: 0, nextReview: 0 },
    {
      id: 671,
      question: 'Better late than never',
      answer: 'Antes tarde do que nunca',
      level: 0,
      nextReview: 0,
    },
    {
      id: 672,
      question: 'Easy come, easy go',
      answer: 'O que vem fácil, vai fácil',
      level: 0,
      nextReview: 0,
    },
    {
      id: 673,
      question: 'Practice makes perfect',
      answer: 'A prática leva à perfeição',
      level: 0,
      nextReview: 0,
    },
    { id: 674, question: 'Time is money', answer: 'Tempo é dinheiro', level: 0, nextReview: 0 },
    {
      id: 675,
      question: 'Better safe than sorry',
      answer: 'Mais vale prevenir do que remediar',
      level: 0,
      nextReview: 0,
    },
    {
      id: 676,
      question: 'I’m looking forward to it',
      answer: 'Estou ansioso(a) por isso',
      level: 0,
      nextReview: 0,
    },
    { id: 677, question: 'I can’t help it', answer: 'Não posso evitar', level: 0, nextReview: 0 },
    {
      id: 678,
      question: 'It’s not a big deal',
      answer: 'Não é grande coisa',
      level: 0,
      nextReview: 0,
    },
    { id: 679, question: 'Let me see', answer: 'Deixe-me ver', level: 0, nextReview: 0 },
    { id: 680, question: 'I’ll be right back', answer: 'Já volto', level: 0, nextReview: 0 },
    { id: 681, question: 'Hang on', answer: 'Espere um pouco', level: 0, nextReview: 0 },
    { id: 682, question: 'I don’t mind', answer: 'Não me importo', level: 0, nextReview: 0 },
    {
      id: 683,
      question: 'It doesn’t make sense',
      answer: 'Não faz sentido',
      level: 0,
      nextReview: 0,
    },
    {
      id: 684,
      question: 'I’ll take care of it',
      answer: 'Eu cuidarei disso',
      level: 0,
      nextReview: 0,
    },
    { id: 685, question: 'I’m in a hurry', answer: 'Estou com pressa', level: 0, nextReview: 0 },
    { id: 686, question: 'I’m on my way', answer: 'Estou a caminho', level: 0, nextReview: 0 },
    { id: 687, question: 'It’s up to you', answer: 'Depende de você', level: 0, nextReview: 0 },
    {
      id: 688,
      question: 'I can’t believe it',
      answer: 'Não posso acreditar',
      level: 0,
      nextReview: 0,
    },
    {
      id: 689,
      question: 'That’s unbelievable',
      answer: 'Isso é inacreditável',
      level: 0,
      nextReview: 0,
    },
    { id: 690, question: 'Keep going', answer: 'Continue', level: 0, nextReview: 0 },
    { id: 691, question: 'Don’t give up', answer: 'Não desista', level: 0, nextReview: 0 },
    { id: 692, question: 'Take it easy', answer: 'Leve na boa', level: 0, nextReview: 0 },
    { id: 693, question: 'It’s worth it', answer: 'Vale a pena', level: 0, nextReview: 0 },
    {
      id: 694,
      question: 'I’m proud of you',
      answer: 'Estou orgulhoso(a) de você',
      level: 0,
      nextReview: 0,
    },
    { id: 695, question: 'It’s my fault', answer: 'Foi minha culpa', level: 0, nextReview: 0 },
    { id: 696, question: 'No way!', answer: 'De jeito nenhum!', level: 0, nextReview: 0 },
    { id: 697, question: 'I’m just kidding', answer: 'Estou brincando', level: 0, nextReview: 0 },
    { id: 698, question: 'Don’t be silly', answer: 'Não seja bobo(a)', level: 0, nextReview: 0 },
    {
      id: 699,
      question: 'I couldn’t agree more',
      answer: 'Não poderia concordar mais',
      level: 0,
      nextReview: 0,
    },
    {
      id: 700,
      question: 'It’s raining cats and dogs',
      answer: 'Está chovendo muito',
      level: 0,
      nextReview: 0,
    },
    {
      id: 701,
      question: 'How much is this?',
      answer: 'Quanto custa isso?',
      level: 0,
      nextReview: 0,
    },
    {
      id: 702,
      question: 'Can I pay by card?',
      answer: 'Posso pagar com cartão?',
      level: 0,
      nextReview: 0,
    },
    {
      id: 703,
      question: 'I would like to order',
      answer: 'Eu gostaria de pedir',
      level: 0,
      nextReview: 0,
    },
    {
      id: 704,
      question: 'Do you have a menu?',
      answer: 'Você tem um cardápio?',
      level: 0,
      nextReview: 0,
    },
    { id: 705, question: 'I am allergic to', answer: 'Sou alérgico(a) a', level: 0, nextReview: 0 },
    {
      id: 706,
      question: 'Can I have the bill, please?',
      answer: 'A conta, por favor?',
      level: 0,
      nextReview: 0,
    },
    {
      id: 707,
      question: 'Where is the bathroom?',
      answer: 'Onde fica o banheiro?',
      level: 0,
      nextReview: 0,
    },
    {
      id: 708,
      question: 'I would like water',
      answer: 'Eu gostaria de água',
      level: 0,
      nextReview: 0,
    },
    { id: 709, question: 'I need a taxi', answer: 'Preciso de um táxi', level: 0, nextReview: 0 },
    {
      id: 710,
      question: 'How do I get to the airport?',
      answer: 'Como eu chego ao aeroporto?',
      level: 0,
      nextReview: 0,
    },
    {
      id: 711,
      question: 'Where can I buy a ticket?',
      answer: 'Onde posso comprar um bilhete?',
      level: 0,
      nextReview: 0,
    },
    { id: 712, question: 'I am lost', answer: 'Estou perdido(a)', level: 0, nextReview: 0 },
    {
      id: 713,
      question: 'Can you help me?',
      answer: 'Você pode me ajudar?',
      level: 0,
      nextReview: 0,
    },
    { id: 714, question: 'I don’t understand', answer: 'Eu não entendo', level: 0, nextReview: 0 },
    {
      id: 715,
      question: 'Could you repeat that?',
      answer: 'Você poderia repetir?',
      level: 0,
      nextReview: 0,
    },
    {
      id: 716,
      question: 'I need directions',
      answer: 'Preciso de direções',
      level: 0,
      nextReview: 0,
    },
    { id: 717, question: 'Turn left', answer: 'Vire à esquerda', level: 0, nextReview: 0 },
    { id: 718, question: 'Turn right', answer: 'Vire à direita', level: 0, nextReview: 0 },
    { id: 719, question: 'Go straight ahead', answer: 'Siga em frente', level: 0, nextReview: 0 },
    { id: 720, question: 'Stop here', answer: 'Pare aqui', level: 0, nextReview: 0 },
    { id: 721, question: 'I need help', answer: 'Preciso de ajuda', level: 0, nextReview: 0 },
    { id: 722, question: 'Call the police', answer: 'Chame a polícia', level: 0, nextReview: 0 },
    {
      id: 723,
      question: 'I need a doctor',
      answer: 'Preciso de um médico',
      level: 0,
      nextReview: 0,
    },
    { id: 724, question: 'I feel sick', answer: 'Estou me sentindo mal', level: 0, nextReview: 0 },
    { id: 725, question: 'I need medicine', answer: 'Preciso de remédio', level: 0, nextReview: 0 },
    { id: 726, question: 'Is it far?', answer: 'É longe?', level: 0, nextReview: 0 },
    {
      id: 727,
      question: 'How long does it take?',
      answer: 'Quanto tempo leva?',
      level: 0,
      nextReview: 0,
    },
    {
      id: 728,
      question: 'I am looking for',
      answer: 'Estou procurando por',
      level: 0,
      nextReview: 0,
    },
    {
      id: 729,
      question: 'Do you speak English?',
      answer: 'Você fala inglês?',
      level: 0,
      nextReview: 0,
    },
    { id: 730, question: 'Just a moment', answer: 'Um momento', level: 0, nextReview: 0 },
    { id: 731, question: 'I am in a hurry', answer: 'Estou com pressa', level: 0, nextReview: 0 },
    { id: 732, question: 'Please wait', answer: 'Por favor, espere', level: 0, nextReview: 0 },
    { id: 733, question: 'I am tired', answer: 'Estou cansado(a)', level: 0, nextReview: 0 },
    { id: 734, question: 'I am happy', answer: 'Estou feliz', level: 0, nextReview: 0 },
    { id: 735, question: 'I am sad', answer: 'Estou triste', level: 0, nextReview: 0 },
    { id: 736, question: 'I am worried', answer: 'Estou preocupado(a)', level: 0, nextReview: 0 },
    { id: 737, question: 'I am excited', answer: 'Estou animado(a)', level: 0, nextReview: 0 },
    { id: 738, question: 'I am bored', answer: 'Estou entediado(a)', level: 0, nextReview: 0 },
    { id: 739, question: 'It is hot', answer: 'Está quente', level: 0, nextReview: 0 },
    { id: 740, question: 'It is cold', answer: 'Está frio', level: 0, nextReview: 0 },
    { id: 741, question: 'It is sunny', answer: 'Está ensolarado', level: 0, nextReview: 0 },
    { id: 742, question: 'It is raining', answer: 'Está chovendo', level: 0, nextReview: 0 },
    { id: 743, question: 'It is snowing', answer: 'Está nevando', level: 0, nextReview: 0 },
    {
      id: 744,
      question: 'What is the weather like?',
      answer: 'Como está o tempo?',
      level: 0,
      nextReview: 0,
    },
    { id: 745, question: 'I like this', answer: 'Eu gosto disso', level: 0, nextReview: 0 },
    {
      id: 746,
      question: 'I don’t like this',
      answer: 'Eu não gosto disso',
      level: 0,
      nextReview: 0,
    },
    { id: 747, question: 'I love it', answer: 'Eu adoro isso', level: 0, nextReview: 0 },
    { id: 748, question: 'I hate it', answer: 'Eu odeio isso', level: 0, nextReview: 0 },
    { id: 749, question: 'It is easy', answer: 'É fácil', level: 0, nextReview: 0 },
    { id: 750, question: 'It is difficult', answer: 'É difícil', level: 0, nextReview: 0 },
    { id: 751, question: 'I understand', answer: 'Eu entendo', level: 0, nextReview: 0 },
    { id: 752, question: 'I don’t understand', answer: 'Eu não entendo', level: 0, nextReview: 0 },
    {
      id: 753,
      question: 'Could you explain?',
      answer: 'Você poderia explicar?',
      level: 0,
      nextReview: 0,
    },
    {
      id: 754,
      question: 'I need a break',
      answer: 'Preciso de uma pausa',
      level: 0,
      nextReview: 0,
    },
    { id: 755, question: 'I am ready', answer: 'Estou pronto(a)', level: 0, nextReview: 0 },
    { id: 756, question: 'I am not ready', answer: 'Não estou pronto(a)', level: 0, nextReview: 0 },
    { id: 757, question: 'I agree', answer: 'Eu concordo', level: 0, nextReview: 0 },
    { id: 758, question: 'I disagree', answer: 'Eu discordo', level: 0, nextReview: 0 },
    {
      id: 759,
      question: 'That’s interesting',
      answer: 'Isso é interessante',
      level: 0,
      nextReview: 0,
    },
    { id: 760, question: 'That’s boring', answer: 'Isso é chato', level: 0, nextReview: 0 },
    { id: 761, question: 'I am sorry', answer: 'Desculpe', level: 0, nextReview: 0 },
    { id: 762, question: 'No worries', answer: 'Sem problemas', level: 0, nextReview: 0 },
    { id: 763, question: 'Excuse me', answer: 'Com licença', level: 0, nextReview: 0 },
    { id: 764, question: 'What happened?', answer: 'O que aconteceu?', level: 0, nextReview: 0 },
    {
      id: 765,
      question: 'Can you show me?',
      answer: 'Você pode me mostrar?',
      level: 0,
      nextReview: 0,
    },
    {
      id: 766,
      question: 'I’m looking forward to it',
      answer: 'Estou ansioso(a) por isso',
      level: 0,
      nextReview: 0,
    },
    { id: 767, question: 'It is my pleasure', answer: 'É um prazer', level: 0, nextReview: 0 },
    { id: 768, question: 'I don’t mind', answer: 'Não me importo', level: 0, nextReview: 0 },
    { id: 769, question: 'I am full', answer: 'Estou cheio(a)', level: 0, nextReview: 0 },
    { id: 770, question: 'I am hungry', answer: 'Estou com fome', level: 0, nextReview: 0 },
    { id: 771, question: 'I am thirsty', answer: 'Estou com sede', level: 0, nextReview: 0 },
    { id: 772, question: 'I am cold', answer: 'Estou com frio', level: 0, nextReview: 0 },
    { id: 773, question: 'I am hot', answer: 'Estou com calor', level: 0, nextReview: 0 },
    { id: 774, question: 'I am tired', answer: 'Estou cansado(a)', level: 0, nextReview: 0 },
    { id: 775, question: 'I am scared', answer: 'Estou com medo', level: 0, nextReview: 0 },
    { id: 776, question: 'I am confused', answer: 'Estou confuso(a)', level: 0, nextReview: 0 },
    { id: 777, question: 'I am surprised', answer: 'Estou surpreso(a)', level: 0, nextReview: 0 },
    { id: 778, question: 'I am late', answer: 'Estou atrasado(a)', level: 0, nextReview: 0 },
    { id: 779, question: 'I am early', answer: 'Estou adiantado(a)', level: 0, nextReview: 0 },
    { id: 780, question: 'Let’s eat', answer: 'Vamos comer', level: 0, nextReview: 0 },
    { id: 781, question: 'Let’s drink', answer: 'Vamos beber', level: 0, nextReview: 0 },
    {
      id: 782,
      question: 'Let’s go shopping',
      answer: 'Vamos fazer compras',
      level: 0,
      nextReview: 0,
    },
    { id: 783, question: 'Let’s go out', answer: 'Vamos sair', level: 0, nextReview: 0 },
    { id: 784, question: 'I will call you', answer: 'Eu vou te ligar', level: 0, nextReview: 0 },
    { id: 785, question: 'See you later', answer: 'Até mais', level: 0, nextReview: 0 },
    { id: 786, question: 'See you soon', answer: 'Até breve', level: 0, nextReview: 0 },
    { id: 787, question: 'Good morning', answer: 'Bom dia', level: 0, nextReview: 0 },
    { id: 788, question: 'Good afternoon', answer: 'Boa tarde', level: 0, nextReview: 0 },
    { id: 789, question: 'Good evening', answer: 'Boa noite', level: 0, nextReview: 0 },
    {
      id: 790,
      question: 'Good night',
      answer: 'Boa noite (ao se despedir)',
      level: 0,
      nextReview: 0,
    },
    { id: 791, question: 'Have a nice day', answer: 'Tenha um bom dia', level: 0, nextReview: 0 },
    {
      id: 792,
      question: 'Have a good trip',
      answer: 'Tenha uma boa viagem',
      level: 0,
      nextReview: 0,
    },
    { id: 793, question: 'Congratulations', answer: 'Parabéns', level: 0, nextReview: 0 },
    { id: 794, question: 'Happy birthday', answer: 'Feliz aniversário', level: 0, nextReview: 0 },
    { id: 795, question: 'Merry Christmas', answer: 'Feliz Natal', level: 0, nextReview: 0 },
    { id: 796, question: 'Happy New Year', answer: 'Feliz Ano Novo', level: 0, nextReview: 0 },
    {
      id: 797,
      question: 'Excuse me, where is…?',
      answer: 'Com licença, onde fica…?',
      level: 0,
      nextReview: 0,
    },
    {
      id: 798,
      question: 'I would like this one',
      answer: 'Eu gostaria deste',
      level: 0,
      nextReview: 0,
    },
    {
      id: 799,
      question: 'Can I try it on?',
      answer: 'Posso experimentar?',
      level: 0,
      nextReview: 0,
    },
    {
      id: 800,
      question: 'Do you have it in another size?',
      answer: 'Você tem em outro tamanho?',
      level: 0,
      nextReview: 0,
    },
    {
      id: 801,
      question: 'I have a reservation',
      answer: 'Eu tenho uma reserva',
      level: 0,
      nextReview: 0,
    },
    {
      id: 802,
      question: 'I would like a room',
      answer: 'Eu gostaria de um quarto',
      level: 0,
      nextReview: 0,
    },
    {
      id: 803,
      question: 'How much per night?',
      answer: 'Quanto por noite?',
      level: 0,
      nextReview: 0,
    },
    {
      id: 804,
      question: 'Do you have a single room?',
      answer: 'Você tem um quarto individual?',
      level: 0,
      nextReview: 0,
    },
    {
      id: 805,
      question: 'Do you have a double room?',
      answer: 'Você tem um quarto duplo?',
      level: 0,
      nextReview: 0,
    },
    {
      id: 806,
      question: 'I would like to check in',
      answer: 'Eu gostaria de fazer o check-in',
      level: 0,
      nextReview: 0,
    },
    {
      id: 807,
      question: 'I would like to check out',
      answer: 'Eu gostaria de fazer o check-out',
      level: 0,
      nextReview: 0,
    },
    {
      id: 808,
      question: 'Is breakfast included?',
      answer: 'O café da manhã está incluído?',
      level: 0,
      nextReview: 0,
    },
    {
      id: 809,
      question: 'I need a wake-up call',
      answer: 'Preciso de um serviço de despertar',
      level: 0,
      nextReview: 0,
    },
    {
      id: 810,
      question: 'Can I have extra towels?',
      answer: 'Posso ter toalhas extras?',
      level: 0,
      nextReview: 0,
    },
    {
      id: 811,
      question: 'Where is the nearest supermarket?',
      answer: 'Onde fica o supermercado mais próximo?',
      level: 0,
      nextReview: 0,
    },
    { id: 812, question: 'Do you sell this?', answer: 'Você vende isso?', level: 0, nextReview: 0 },
    {
      id: 813,
      question: 'Can I pay in cash?',
      answer: 'Posso pagar em dinheiro?',
      level: 0,
      nextReview: 0,
    },
    {
      id: 814,
      question: 'Can I pay with card?',
      answer: 'Posso pagar com cartão?',
      level: 0,
      nextReview: 0,
    },
    {
      id: 815,
      question: 'Do you have a bag?',
      answer: 'Você tem uma sacola?',
      level: 0,
      nextReview: 0,
    },
    {
      id: 816,
      question: 'I am looking for this item',
      answer: 'Estou procurando por este item',
      level: 0,
      nextReview: 0,
    },
    {
      id: 817,
      question: 'Do you have it in stock?',
      answer: 'Você tem isso em estoque?',
      level: 0,
      nextReview: 0,
    },
    {
      id: 818,
      question: 'Can you give me a discount?',
      answer: 'Você pode me dar um desconto?',
      level: 0,
      nextReview: 0,
    },
    {
      id: 819,
      question: 'I need a receipt',
      answer: 'Preciso de um recibo',
      level: 0,
      nextReview: 0,
    },
    { id: 820, question: 'Where is the exit?', answer: 'Onde é a saída?', level: 0, nextReview: 0 },
    {
      id: 821,
      question: 'I would like a window seat',
      answer: 'Eu gostaria de um assento na janela',
      level: 0,
      nextReview: 0,
    },
    {
      id: 822,
      question: 'I would like an aisle seat',
      answer: 'Eu gostaria de um assento no corredor',
      level: 0,
      nextReview: 0,
    },
    {
      id: 823,
      question: 'Is this the gate for flight…?',
      answer: 'Este é o portão para o voo…?',
      level: 0,
      nextReview: 0,
    },
    {
      id: 824,
      question: 'What time does the flight leave?',
      answer: 'A que horas sai o voo?',
      level: 0,
      nextReview: 0,
    },
    {
      id: 825,
      question: 'What time does the flight arrive?',
      answer: 'A que horas chega o voo?',
      level: 0,
      nextReview: 0,
    },
    {
      id: 826,
      question: 'Where can I claim my luggage?',
      answer: 'Onde posso pegar minha bagagem?',
      level: 0,
      nextReview: 0,
    },
    {
      id: 827,
      question: 'Is the flight on time?',
      answer: 'O voo está no horário?',
      level: 0,
      nextReview: 0,
    },
    {
      id: 828,
      question: 'The flight is delayed',
      answer: 'O voo está atrasado',
      level: 0,
      nextReview: 0,
    },
    {
      id: 829,
      question: 'The flight is cancelled',
      answer: 'O voo foi cancelado',
      level: 0,
      nextReview: 0,
    },
    { id: 830, question: 'I need a map', answer: 'Preciso de um mapa', level: 0, nextReview: 0 },
    {
      id: 831,
      question: 'Can you show me on the map?',
      answer: 'Você pode me mostrar no mapa?',
      level: 0,
      nextReview: 0,
    },
    {
      id: 832,
      question: 'Where is the nearest bank?',
      answer: 'Onde fica o banco mais próximo?',
      level: 0,
      nextReview: 0,
    },
    {
      id: 833,
      question: 'Where is the nearest ATM?',
      answer: 'Onde fica o caixa eletrônico mais próximo?',
      level: 0,
      nextReview: 0,
    },
    {
      id: 834,
      question: 'I would like to exchange money',
      answer: 'Gostaria de trocar dinheiro',
      level: 0,
      nextReview: 0,
    },
    {
      id: 835,
      question: 'What is the exchange rate?',
      answer: 'Qual é a taxa de câmbio?',
      level: 0,
      nextReview: 0,
    },
    {
      id: 836,
      question: 'I need a doctor',
      answer: 'Preciso de um médico',
      level: 0,
      nextReview: 0,
    },
    {
      id: 837,
      question: 'Where is the pharmacy?',
      answer: 'Onde fica a farmácia?',
      level: 0,
      nextReview: 0,
    },
    {
      id: 838,
      question: 'I need a prescription',
      answer: 'Preciso de uma receita médica',
      level: 0,
      nextReview: 0,
    },
    { id: 839, question: 'I feel sick', answer: 'Estou me sentindo mal', level: 0, nextReview: 0 },
    {
      id: 840,
      question: 'I have a headache',
      answer: 'Estou com dor de cabeça',
      level: 0,
      nextReview: 0,
    },
    {
      id: 841,
      question: 'I have a stomachache',
      answer: 'Estou com dor de estômago',
      level: 0,
      nextReview: 0,
    },
    { id: 842, question: 'I have a fever', answer: 'Estou com febre', level: 0, nextReview: 0 },
    { id: 843, question: 'I have a cold', answer: 'Estou resfriado(a)', level: 0, nextReview: 0 },
    { id: 844, question: 'I have a cough', answer: 'Estou com tosse', level: 0, nextReview: 0 },
    {
      id: 845,
      question: 'Do you have a pen?',
      answer: 'Você tem uma caneta?',
      level: 0,
      nextReview: 0,
    },
    { id: 846, question: 'Do you have paper?', answer: 'Você tem papel?', level: 0, nextReview: 0 },
    {
      id: 847,
      question: 'Can I use the Wi-Fi?',
      answer: 'Posso usar o Wi-Fi?',
      level: 0,
      nextReview: 0,
    },
    {
      id: 848,
      question: 'What is the Wi-Fi password?',
      answer: 'Qual é a senha do Wi-Fi?',
      level: 0,
      nextReview: 0,
    },
    {
      id: 849,
      question: 'I need help with my computer',
      answer: 'Preciso de ajuda com meu computador',
      level: 0,
      nextReview: 0,
    },
    {
      id: 850,
      question: 'Can you fix it?',
      answer: 'Você pode consertar?',
      level: 0,
      nextReview: 0,
    },
    {
      id: 851,
      question: 'I need to send an email',
      answer: 'Preciso enviar um e-mail',
      level: 0,
      nextReview: 0,
    },
    {
      id: 852,
      question: 'I need to print a document',
      answer: 'Preciso imprimir um documento',
      level: 0,
      nextReview: 0,
    },
    {
      id: 853,
      question: 'Can you help me, please?',
      answer: 'Você pode me ajudar, por favor?',
      level: 0,
      nextReview: 0,
    },
    {
      id: 854,
      question: 'I need an appointment',
      answer: 'Preciso de um horário marcado',
      level: 0,
      nextReview: 0,
    },
    {
      id: 855,
      question: 'I have an appointment',
      answer: 'Tenho um horário marcado',
      level: 0,
      nextReview: 0,
    },
    { id: 856, question: 'I need to cancel', answer: 'Preciso cancelar', level: 0, nextReview: 0 },
    {
      id: 857,
      question: 'I need to reschedule',
      answer: 'Preciso remarcar',
      level: 0,
      nextReview: 0,
    },
    {
      id: 858,
      question: 'I have a question',
      answer: 'Tenho uma pergunta',
      level: 0,
      nextReview: 0,
    },
    {
      id: 859,
      question: 'Can you answer my question?',
      answer: 'Você pode responder minha pergunta?',
      level: 0,
      nextReview: 0,
    },
    {
      id: 860,
      question: 'I need information',
      answer: 'Preciso de informações',
      level: 0,
      nextReview: 0,
    },
    {
      id: 861,
      question: 'Can you give me information?',
      answer: 'Você pode me dar informações?',
      level: 0,
      nextReview: 0,
    },
    {
      id: 862,
      question: 'I am here on business',
      answer: 'Estou aqui a negócios',
      level: 0,
      nextReview: 0,
    },
    {
      id: 863,
      question: 'I am here on vacation',
      answer: 'Estou aqui de férias',
      level: 0,
      nextReview: 0,
    },
    { id: 864, question: 'I have a meeting', answer: 'Tenho uma reunião', level: 0, nextReview: 0 },
    {
      id: 865,
      question: 'I need a conference room',
      answer: 'Preciso de uma sala de conferência',
      level: 0,
      nextReview: 0,
    },
    {
      id: 866,
      question: 'Can you recommend a restaurant?',
      answer: 'Você pode recomendar um restaurante?',
      level: 0,
      nextReview: 0,
    },
    {
      id: 867,
      question: 'I would like to book a table',
      answer: 'Gostaria de reservar uma mesa',
      level: 0,
      nextReview: 0,
    },
    {
      id: 868,
      question: 'Do you have a reservation?',
      answer: 'Você tem uma reserva?',
      level: 0,
      nextReview: 0,
    },
    {
      id: 869,
      question: 'I am allergic to nuts',
      answer: 'Sou alérgico(a) a nozes',
      level: 0,
      nextReview: 0,
    },
    { id: 870, question: 'I don’t eat meat', answer: 'Não como carne', level: 0, nextReview: 0 },
    { id: 871, question: 'I am vegetarian', answer: 'Sou vegetariano(a)', level: 0, nextReview: 0 },
    { id: 872, question: 'I am vegan', answer: 'Sou vegano(a)', level: 0, nextReview: 0 },
    {
      id: 873,
      question: 'I need a taxi to the airport',
      answer: 'Preciso de um táxi para o aeroporto',
      level: 0,
      nextReview: 0,
    },
    {
      id: 874,
      question: 'I need a ride',
      answer: 'Preciso de uma carona',
      level: 0,
      nextReview: 0,
    },
    {
      id: 875,
      question: 'I need a bus ticket',
      answer: 'Preciso de uma passagem de ônibus',
      level: 0,
      nextReview: 0,
    },
    {
      id: 876,
      question: 'I need a train ticket',
      answer: 'Preciso de uma passagem de trem',
      level: 0,
      nextReview: 0,
    },
    {
      id: 877,
      question: 'Where is the bus station?',
      answer: 'Onde fica a estação de ônibus?',
      level: 0,
      nextReview: 0,
    },
    {
      id: 878,
      question: 'Where is the train station?',
      answer: 'Onde fica a estação de trem?',
      level: 0,
      nextReview: 0,
    },
    { id: 879, question: 'Which platform?', answer: 'Qual plataforma?', level: 0, nextReview: 0 },
    { id: 880, question: 'Which gate?', answer: 'Qual portão?', level: 0, nextReview: 0 },
    {
      id: 881,
      question: 'Can I have a receipt?',
      answer: 'Posso ter um recibo?',
      level: 0,
      nextReview: 0,
    },
    {
      id: 882,
      question: 'Can I have a bag?',
      answer: 'Posso ter uma sacola?',
      level: 0,
      nextReview: 0,
    },
    {
      id: 883,
      question: 'Do you have this in another color?',
      answer: 'Você tem isso em outra cor?',
      level: 0,
      nextReview: 0,
    },
    {
      id: 884,
      question: 'Do you have this in another size?',
      answer: 'Você tem isso em outro tamanho?',
      level: 0,
      nextReview: 0,
    },
    {
      id: 885,
      question: 'Can I try this on?',
      answer: 'Posso experimentar isso?',
      level: 0,
      nextReview: 0,
    },
    { id: 886, question: 'I will take it', answer: 'Eu vou levar', level: 0, nextReview: 0 },
    {
      id: 887,
      question: 'I would like to return this',
      answer: 'Gostaria de devolver isso',
      level: 0,
      nextReview: 0,
    },
    {
      id: 888,
      question: 'Can you help me find…?',
      answer: 'Você pode me ajudar a encontrar…?',
      level: 0,
      nextReview: 0,
    },
    {
      id: 889,
      question: 'I need a haircut',
      answer: 'Preciso de um corte de cabelo',
      level: 0,
      nextReview: 0,
    },
    {
      id: 890,
      question: 'I need a haircut appointment',
      answer: 'Preciso marcar um horário para corte de cabelo',
      level: 0,
      nextReview: 0,
    },
    {
      id: 891,
      question: 'Can you call a taxi?',
      answer: 'Você pode chamar um táxi?',
      level: 0,
      nextReview: 0,
    },
    {
      id: 892,
      question: 'I am checking in',
      answer: 'Estou fazendo o check-in',
      level: 0,
      nextReview: 0,
    },
    {
      id: 893,
      question: 'I am checking out',
      answer: 'Estou fazendo o check-out',
      level: 0,
      nextReview: 0,
    },
    {
      id: 894,
      question: 'I need directions to…',
      answer: 'Preciso de direções para…',
      level: 0,
      nextReview: 0,
    },
    {
      id: 895,
      question: 'I need to buy a ticket',
      answer: 'Preciso comprar um bilhete',
      level: 0,
      nextReview: 0,
    },
    {
      id: 896,
      question: 'I need to find a taxi',
      answer: 'Preciso encontrar um táxi',
      level: 0,
      nextReview: 0,
    },
    {
      id: 897,
      question: 'Can I have a map?',
      answer: 'Posso ter um mapa?',
      level: 0,
      nextReview: 0,
    },
    {
      id: 898,
      question: 'I need a doctor immediately',
      answer: 'Preciso de um médico imediatamente',
      level: 0,
      nextReview: 0,
    },
    {
      id: 899,
      question: 'Where is the nearest hospital?',
      answer: 'Onde fica o hospital mais próximo?',
      level: 0,
      nextReview: 0,
    },
    { id: 900, question: 'I feel unwell', answer: 'Não me sinto bem', level: 0, nextReview: 0 },
    {
      id: 901,
      question: 'I would like a menu',
      answer: 'Eu gostaria de um cardápio',
      level: 0,
      nextReview: 0,
    },
    {
      id: 902,
      question: 'Can I have the bill, please?',
      answer: 'A conta, por favor',
      level: 0,
      nextReview: 0,
    },
    {
      id: 903,
      question: 'Do you have vegetarian options?',
      answer: 'Você tem opções vegetarianas?',
      level: 0,
      nextReview: 0,
    },
    {
      id: 904,
      question: 'Do you have vegan options?',
      answer: 'Você tem opções veganas?',
      level: 0,
      nextReview: 0,
    },
    {
      id: 905,
      question: 'I am allergic to gluten',
      answer: 'Sou alérgico(a) ao glúten',
      level: 0,
      nextReview: 0,
    },
    {
      id: 906,
      question: 'I would like water',
      answer: 'Eu gostaria de água',
      level: 0,
      nextReview: 0,
    },
    {
      id: 907,
      question: 'I would like coffee',
      answer: 'Eu gostaria de café',
      level: 0,
      nextReview: 0,
    },
    {
      id: 908,
      question: 'I would like tea',
      answer: 'Eu gostaria de chá',
      level: 0,
      nextReview: 0,
    },
    {
      id: 909,
      question: 'Do you have Wi-Fi?',
      answer: 'Vocês têm Wi-Fi?',
      level: 0,
      nextReview: 0,
    },
    {
      id: 910,
      question: 'I would like a table for two',
      answer: 'Gostaria de uma mesa para dois',
      level: 0,
      nextReview: 0,
    },
    {
      id: 911,
      question: 'Can I make a reservation?',
      answer: 'Posso fazer uma reserva?',
      level: 0,
      nextReview: 0,
    },
    {
      id: 912,
      question: 'Is service included?',
      answer: 'O serviço está incluído?',
      level: 0,
      nextReview: 0,
    },
    {
      id: 913,
      question: 'I would like a starter',
      answer: 'Eu gostaria de uma entrada',
      level: 0,
      nextReview: 0,
    },
    {
      id: 914,
      question: 'I would like the main course',
      answer: 'Eu gostaria do prato principal',
      level: 0,
      nextReview: 0,
    },
    {
      id: 915,
      question: 'I would like dessert',
      answer: 'Eu gostaria de sobremesa',
      level: 0,
      nextReview: 0,
    },
    {
      id: 916,
      question: 'I would like a soft drink',
      answer: 'Eu gostaria de um refrigerante',
      level: 0,
      nextReview: 0,
    },
    {
      id: 917,
      question: 'I would like wine',
      answer: 'Eu gostaria de vinho',
      level: 0,
      nextReview: 0,
    },
    {
      id: 918,
      question: 'I would like beer',
      answer: 'Eu gostaria de cerveja',
      level: 0,
      nextReview: 0,
    },
    {
      id: 919,
      question: 'Can I pay separately?',
      answer: 'Podemos pagar separadamente?',
      level: 0,
      nextReview: 0,
    },
    { id: 920, question: 'I need a taxi', answer: 'Preciso de um táxi', level: 0, nextReview: 0 },
    {
      id: 921,
      question: 'I need a car rental',
      answer: 'Preciso alugar um carro',
      level: 0,
      nextReview: 0,
    },
    { id: 922, question: 'I need a hotel', answer: 'Preciso de um hotel', level: 0, nextReview: 0 },
    {
      id: 923,
      question: 'Do you speak English?',
      answer: 'Você fala inglês?',
      level: 0,
      nextReview: 0,
    },
    {
      id: 924,
      question: 'I need directions',
      answer: 'Preciso de direções',
      level: 0,
      nextReview: 0,
    },
    {
      id: 925,
      question: 'Can you show me on the map?',
      answer: 'Você pode me mostrar no mapa?',
      level: 0,
      nextReview: 0,
    },
    {
      id: 926,
      question: 'I need a pharmacy',
      answer: 'Preciso de uma farmácia',
      level: 0,
      nextReview: 0,
    },
    {
      id: 927,
      question: 'I need a hospital',
      answer: 'Preciso de um hospital',
      level: 0,
      nextReview: 0,
    },
    {
      id: 928,
      question: 'Where is the police station?',
      answer: 'Onde fica a delegacia?',
      level: 0,
      nextReview: 0,
    },
    {
      id: 929,
      question: 'I lost my wallet',
      answer: 'Perdi minha carteira',
      level: 0,
      nextReview: 0,
    },
    {
      id: 930,
      question: 'I lost my passport',
      answer: 'Perdi meu passaporte',
      level: 0,
      nextReview: 0,
    },
    {
      id: 931,
      question: 'I need a new SIM card',
      answer: 'Preciso de um novo chip',
      level: 0,
      nextReview: 0,
    },
    {
      id: 932,
      question: 'Can you help me?',
      answer: 'Você pode me ajudar?',
      level: 0,
      nextReview: 0,
    },
    {
      id: 933,
      question: 'I need a translator',
      answer: 'Preciso de um tradutor',
      level: 0,
      nextReview: 0,
    },
    {
      id: 934,
      question: 'I need a doctor',
      answer: 'Preciso de um médico',
      level: 0,
      nextReview: 0,
    },
    {
      id: 935,
      question: 'I need a dentist',
      answer: 'Preciso de um dentista',
      level: 0,
      nextReview: 0,
    },
    {
      id: 936,
      question: 'I need an optician',
      answer: 'Preciso de um oftalmologista',
      level: 0,
      nextReview: 0,
    },
    {
      id: 937,
      question: 'I need to buy medicine',
      answer: 'Preciso comprar remédio',
      level: 0,
      nextReview: 0,
    },
    {
      id: 938,
      question: 'I need to see a specialist',
      answer: 'Preciso ver um especialista',
      level: 0,
      nextReview: 0,
    },
    {
      id: 939,
      question: 'I need an appointment',
      answer: 'Preciso marcar um horário',
      level: 0,
      nextReview: 0,
    },
    {
      id: 940,
      question: 'I need to cancel an appointment',
      answer: 'Preciso cancelar um horário',
      level: 0,
      nextReview: 0,
    },
    {
      id: 941,
      question: 'I need to reschedule',
      answer: 'Preciso remarcar',
      level: 0,
      nextReview: 0,
    },
    {
      id: 942,
      question: 'I need information',
      answer: 'Preciso de informações',
      level: 0,
      nextReview: 0,
    },
    {
      id: 943,
      question: 'Can you give me information?',
      answer: 'Você pode me dar informações?',
      level: 0,
      nextReview: 0,
    },
    {
      id: 944,
      question: 'I am here on business',
      answer: 'Estou aqui a negócios',
      level: 0,
      nextReview: 0,
    },
    {
      id: 945,
      question: 'I am here on vacation',
      answer: 'Estou aqui de férias',
      level: 0,
      nextReview: 0,
    },
    {
      id: 946,
      question: 'I need to buy a ticket',
      answer: 'Preciso comprar um bilhete',
      level: 0,
      nextReview: 0,
    },
    {
      id: 947,
      question: 'I need to find a taxi',
      answer: 'Preciso encontrar um táxi',
      level: 0,
      nextReview: 0,
    },
    {
      id: 948,
      question: 'Can you call a taxi for me?',
      answer: 'Você pode chamar um táxi para mim?',
      level: 0,
      nextReview: 0,
    },
    {
      id: 949,
      question: 'I would like to rent a car',
      answer: 'Gostaria de alugar um carro',
      level: 0,
      nextReview: 0,
    },
    { id: 950, question: 'I need a guide', answer: 'Preciso de um guia', level: 0, nextReview: 0 },
    {
      id: 951,
      question: 'Can you recommend a place to eat?',
      answer: 'Você pode recomendar um lugar para comer?',
      level: 0,
      nextReview: 0,
    },
    {
      id: 952,
      question: 'Can you recommend a hotel?',
      answer: 'Você pode recomendar um hotel?',
      level: 0,
      nextReview: 0,
    },
    {
      id: 953,
      question: 'Can you recommend a tour?',
      answer: 'Você pode recomendar um passeio?',
      level: 0,
      nextReview: 0,
    },
    {
      id: 954,
      question: 'I would like a single room',
      answer: 'Gostaria de um quarto individual',
      level: 0,
      nextReview: 0,
    },
    {
      id: 955,
      question: 'I would like a double room',
      answer: 'Gostaria de um quarto duplo',
      level: 0,
      nextReview: 0,
    },
    {
      id: 956,
      question: 'I need a reservation',
      answer: 'Preciso de uma reserva',
      level: 0,
      nextReview: 0,
    },
    {
      id: 957,
      question: 'Do you have a table?',
      answer: 'Vocês têm uma mesa?',
      level: 0,
      nextReview: 0,
    },
    { id: 958, question: 'Can I sit here?', answer: 'Posso sentar aqui?', level: 0, nextReview: 0 },
    {
      id: 959,
      question: 'I am ready to order',
      answer: 'Estou pronto para pedir',
      level: 0,
      nextReview: 0,
    },
    {
      id: 960,
      question: 'I would like to order',
      answer: 'Eu gostaria de pedir',
      level: 0,
      nextReview: 0,
    },
    {
      id: 961,
      question: 'Can I have the check?',
      answer: 'Posso ter a conta?',
      level: 0,
      nextReview: 0,
    },
    {
      id: 962,
      question: 'I would like to pay',
      answer: 'Eu gostaria de pagar',
      level: 0,
      nextReview: 0,
    },
    {
      id: 963,
      question: 'Is the tip included?',
      answer: 'A gorjeta está incluída?',
      level: 0,
      nextReview: 0,
    },
    {
      id: 964,
      question: 'I need a menu in English',
      answer: 'Preciso de um cardápio em inglês',
      level: 0,
      nextReview: 0,
    },
    {
      id: 965,
      question: 'I would like a reservation for tonight',
      answer: 'Gostaria de uma reserva para hoje à noite',
      level: 0,
      nextReview: 0,
    },
    {
      id: 966,
      question: 'I would like to cancel my reservation',
      answer: 'Gostaria de cancelar minha reserva',
      level: 0,
      nextReview: 0,
    },
    {
      id: 967,
      question: 'I would like to change my reservation',
      answer: 'Gostaria de alterar minha reserva',
      level: 0,
      nextReview: 0,
    },
    {
      id: 968,
      question: 'I need a taxi to the hotel',
      answer: 'Preciso de um táxi para o hotel',
      level: 0,
      nextReview: 0,
    },
    {
      id: 969,
      question: 'Can I have a wake-up call?',
      answer: 'Posso receber um serviço de despertar?',
      level: 0,
      nextReview: 0,
    },
    {
      id: 970,
      question: 'I need extra towels',
      answer: 'Preciso de toalhas extras',
      level: 0,
      nextReview: 0,
    },
    {
      id: 971,
      question: 'Can I have more pillows?',
      answer: 'Posso ter mais travesseiros?',
      level: 0,
      nextReview: 0,
    },
    {
      id: 972,
      question: 'I need room service',
      answer: 'Preciso de serviço de quarto',
      level: 0,
      nextReview: 0,
    },
    {
      id: 973,
      question: 'I would like a non-smoking room',
      answer: 'Gostaria de um quarto para não fumantes',
      level: 0,
      nextReview: 0,
    },
    {
      id: 974,
      question: 'I would like a quiet room',
      answer: 'Gostaria de um quarto silencioso',
      level: 0,
      nextReview: 0,
    },
    {
      id: 975,
      question: 'Do you have a safe?',
      answer: 'Vocês têm um cofre?',
      level: 0,
      nextReview: 0,
    },
    {
      id: 976,
      question: 'Do you have parking?',
      answer: 'Vocês têm estacionamento?',
      level: 0,
      nextReview: 0,
    },
    {
      id: 977,
      question: 'I need a luggage storage',
      answer: 'Preciso de armazenamento para bagagem',
      level: 0,
      nextReview: 0,
    },
    {
      id: 978,
      question: 'Can I have a late check-out?',
      answer: 'Posso fazer check-out tarde?',
      level: 0,
      nextReview: 0,
    },
    {
      id: 979,
      question: 'Can I have an early check-in?',
      answer: 'Posso fazer check-in cedo?',
      level: 0,
      nextReview: 0,
    },
    {
      id: 980,
      question: 'I need a taxi to the airport',
      answer: 'Preciso de um táxi para o aeroporto',
      level: 0,
      nextReview: 0,
    },
    {
      id: 981,
      question: 'I need a shuttle',
      answer: 'Preciso de um transporte',
      level: 0,
      nextReview: 0,
    },
    { id: 982, question: 'I need a bus', answer: 'Preciso de um ônibus', level: 0, nextReview: 0 },
    { id: 983, question: 'I need a train', answer: 'Preciso de um trem', level: 0, nextReview: 0 },
    {
      id: 984,
      question: 'I need to buy a ticket',
      answer: 'Preciso comprar um bilhete',
      level: 0,
      nextReview: 0,
    },
    {
      id: 985,
      question: 'I need to find a platform',
      answer: 'Preciso encontrar a plataforma',
      level: 0,
      nextReview: 0,
    },
    {
      id: 986,
      question: 'Where is the departure?',
      answer: 'Onde é a partida?',
      level: 0,
      nextReview: 0,
    },
    {
      id: 987,
      question: 'Where is the arrival?',
      answer: 'Onde é a chegada?',
      level: 0,
      nextReview: 0,
    },
    {
      id: 988,
      question: 'I need luggage assistance',
      answer: 'Preciso de ajuda com a bagagem',
      level: 0,
      nextReview: 0,
    },
    {
      id: 989,
      question: 'Can you help me with my bags?',
      answer: 'Você pode me ajudar com minhas malas?',
      level: 0,
      nextReview: 0,
    },
    {
      id: 990,
      question: 'I need to go to the city center',
      answer: 'Preciso ir para o centro da cidade',
      level: 0,
      nextReview: 0,
    },
    {
      id: 991,
      question: 'I need directions to the airport',
      answer: 'Preciso de direções para o aeroporto',
      level: 0,
      nextReview: 0,
    },
    {
      id: 992,
      question: 'I need a taxi now',
      answer: 'Preciso de um táxi agora',
      level: 0,
      nextReview: 0,
    },
    {
      id: 993,
      question: 'Can you recommend a cafe?',
      answer: 'Você pode recomendar um café?',
      level: 0,
      nextReview: 0,
    },
    {
      id: 994,
      question: 'I would like to order breakfast',
      answer: 'Gostaria de pedir o café da manhã',
      level: 0,
      nextReview: 0,
    },
    {
      id: 995,
      question: 'I would like to order lunch',
      answer: 'Gostaria de pedir o almoço',
      level: 0,
      nextReview: 0,
    },
    {
      id: 996,
      question: 'I would like to order dinner',
      answer: 'Gostaria de pedir o jantar',
      level: 0,
      nextReview: 0,
    },
    {
      id: 997,
      question: 'Can you bring the bill?',
      answer: 'Você pode trazer a conta?',
      level: 0,
      nextReview: 0,
    },
    {
      id: 998,
      question: 'Can I pay with card?',
      answer: 'Posso pagar com cartão?',
      level: 0,
      nextReview: 0,
    },
    {
      id: 999,
      question: 'Can I pay in cash?',
      answer: 'Posso pagar em dinheiro?',
      level: 0,
      nextReview: 0,
    },
    {
      id: 1000,
      question: 'I need a taxi back to the hotel',
      answer: 'Preciso de um táxi de volta para o hotel',
      level: 0,
      nextReview: 0,
    },
  ];

  studyQueue: Card[] = [];
  reviewQueue: Card[] = [];
  intervalId: any = null;

  mode: 'time' | 'queue' | 'memory' = 'time';

  ngOnInit() {
    this.deckId = this.route.snapshot.paramMap.get('id');

    this.route.queryParams.subscribe((params) => {
      this.mode = params['mode'] || 'time';
      this.initMode();
    });
  }

  constructor(private route: ActivatedRoute) {}

  // ngOnInit() {
  //   this.deckId = this.route.snapshot.paramMap.get('id');
  //   this.studyQueue = [...this.flashcards];
  //   this.startReviewLoop();
  // }

  initMode() {
    if (this.mode === 'time') {
      this.studyQueue = [...this.flashcards];
      this.startReviewLoop();
    }

    if (this.mode === 'queue') {
      this.studyQueue = [...this.flashcards];
    }

    if (this.mode === 'memory') {
      this.initMemoryGame();
    }
  }

  memoryCards: any[] = [];
  selectedCards: any[] = [];

  initMemoryGame() {
    const duplicated = this.flashcards.flatMap((card) => [
      { ...card, type: 'q' },
      { ...card, type: 'a' },
    ]);

    this.memoryCards = duplicated.sort(() => Math.random() - 0.5);
  }

  selectMemoryCard(card: any) {
    if (this.selectedCards.length === 2) return;

    card.flipped = true;
    this.selectedCards.push(card);

    if (this.selectedCards.length === 2) {
      setTimeout(() => {
        const [a, b] = this.selectedCards;

        if (a.id !== b.id) {
          a.flipped = false;
          b.flipped = false;
        }

        this.selectedCards = [];
      }, 800);
    }
  }

  get currentCard(): Card | null {
    return this.studyQueue.length > 0 ? this.studyQueue[0] : null;
  }

  getWrongDelay() {
    return 5000;
  }

  getCorrectDelay(level: number) {
    const delays = [10000, 30000, 60000, 300000];
    return delays[level] || 300000;
  }

  markWrong() {
    if (this.mode === 'queue') {
      const card = this.currentCard;
      if (!card) return;

      this.studyQueue.shift();
      this.studyQueue.push(card);
      return;
    }

    const card = this.currentCard;
    if (!card) return;

    card.level = 0;
    card.nextReview = Date.now() + this.getWrongDelay();

    this.studyQueue.shift();
    this.studyQueue.push(card);

    if (!this.reviewQueue.find((c) => c.id === card.id)) {
      this.reviewQueue.push(card);
    }
  }

  markCorrect() {
    const card = this.currentCard;
    if (!card) return;

    card.level++;
    card.nextReview = Date.now() + this.getCorrectDelay(card.level);

    this.studyQueue.shift();

    if (!this.reviewQueue.find((c) => c.id === card.id)) {
      this.reviewQueue.push(card);
    }
  }

  startReviewLoop() {
    if (this.intervalId) return;

    this.intervalId = setInterval(() => {
      this.checkReviewQueue();
    }, 300);
  }

  checkReviewQueue() {
    const now = Date.now();

    for (let i = 0; i < this.reviewQueue.length; i++) {
      const card = this.reviewQueue[i];

      if (card.nextReview <= now) {
        this.studyQueue = this.studyQueue.filter((c) => c.id !== card.id);
        this.studyQueue.splice(1, 0, card);
        this.reviewQueue.splice(i, 1);
        i--;
      }
    }
  }

  onAnswer(result: 'correct' | 'wrong') {
    if (result === 'wrong') {
      this.markWrong();
    } else {
      this.markCorrect();
    }
  }
}
