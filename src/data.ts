export type WeekData = {
  id: string;
  title: string;
  subtitle: string;
  sleep: string;
  feeding: string;
  feedingDetails: string;
  feedingSchedule: string;
  crying: string;
  milestones: string[];
  summary: string;
  type: 'week' | 'month';
};

export const babyData: WeekData[] = [
  {
    id: 'week-0',
    title: 'Week 0',
    subtitle: 'Welcome to the world!',
    sleep: '16-20 hours a day, irregular patterns.',
    feeding: 'On-demand, 450-600 ml daily.',
    feedingDetails: 'Feed on-demand. Expect 450-600 ml daily. Direct feeding from the breast is encouraged to promote better appetite control.',
    feedingSchedule: 'On-demand feeding, typically 8-12 times a day. No set schedule yet; intervals are highly irregular.',
    crying: '1-3 hours daily.',
    milestones: ['Kangaroo care', 'Bonding with parents'],
    summary: 'Parents can leave the hospital once they and the baby are well. Newborns sleep 16-20 hours a day with irregular patterns.',
    type: 'week'
  },
  {
    id: 'week-1',
    title: 'Week 1',
    subtitle: 'Settling in at home',
    sleep: '16-20 hours a day. Encourage night/day differentiation.',
    feeding: 'Regular feeding, up to 12 times a day.',
    feedingDetails: 'Regular feeding up to 12 times a day. 450-600 ml daily expected. Sore nipples and concerns about milk supply are common.',
    feedingSchedule: 'On-demand feeding continues, up to 12 times a day. Intervals remain irregular as the baby adjusts.',
    crying: 'Crying may peak this week due to communication needs.',
    milestones: ['Recognizing faces', 'Responding to interactions'],
    summary: 'As the initial chaos settles, parents may feel overwhelmed. Babies begin recognizing faces and responding to interactions.',
    type: 'week'
  },
  {
    id: 'week-2',
    title: 'Week 2',
    subtitle: 'Health visitor visit',
    sleep: '15-18 hours daily. Swaddling can aid sleep.',
    feeding: '600-750 ml, 7-10 feeds per day.',
    feedingDetails: 'Daily milk intake: 600-750 ml; 7-10 feeds per day. Increase feeding frequency during growth spurts.',
    feedingSchedule: '7-10 feeds per day. Intervals may start to stretch slightly, but continue to feed on demand.',
    crying: '2-5 hours daily.',
    milestones: ['Making vowel sounds', 'Responding to sounds'],
    summary: 'Baby needs 15-18 hours of sleep daily. Swaddling can aid sleep but monitor for discomfort.',
    type: 'week'
  },
  {
    id: 'week-3',
    title: 'Week 3',
    subtitle: 'Baby clinic visit',
    sleep: '15-18 hours daily.',
    feeding: '600-750 ml, 7-10 feeds per day.',
    feedingDetails: 'Daily milk intake: 600-750 ml (21-26 oz); 7-10 feeds are typical. Focus on weight gain as an objective indicator of health.',
    feedingSchedule: '7-10 feeds per day. Patterns may begin to emerge, but remain flexible to the baby\'s cues.',
    crying: '1-3 hours daily. Colic may emerge.',
    milestones: ['Waving arms', 'Reaching'],
    summary: 'Colic may affect 1 in 5 babies. Babies will start waving arms and reaching.',
    type: 'week'
  },
  {
    id: 'week-4',
    title: 'Week 4',
    subtitle: 'Baby registration',
    sleep: '14-17 hours daily. Expect evening alertness.',
    feeding: '660-840 ml, 7-10 feeds per day.',
    feedingDetails: 'Daily milk requirement: 660-840 ml (23-29 oz); 7-10 feeds daily. Efficient feeding reduces time, necessitating frequent burping.',
    feedingSchedule: '7-10 feeds per day. Efficient feeding may reduce the time spent per feed.',
    crying: '1-6 hours daily.',
    milestones: ['Real tears', 'Kicking more', 'Tummy time'],
    summary: 'Baby may cry real tears and kick more. Encourage tummy time for muscle strength.',
    type: 'week'
  },
  {
    id: 'week-5',
    title: 'Week 5',
    subtitle: 'Six-week check-up approaches',
    sleep: '14-17 hours daily. Longer night sleep.',
    feeding: '660-900 ml, 7-10 feeds per day.',
    feedingDetails: 'Milk intake: 660-900 ml over 7-10 feeds; aim for longer spacing between feeds.',
    feedingSchedule: '7-10 feeds per day. Aim for longer spacing between feeds as stomach capacity grows.',
    crying: '1-6 hours daily.',
    milestones: ['Tracking moving objects'],
    summary: 'Routine check-up for health assessment. Babies can track moving objects.',
    type: 'week'
  },
  {
    id: 'week-6',
    title: 'Week 6',
    subtitle: 'The first social smile',
    sleep: '14-17 hours daily.',
    feeding: '660-900 ml, 6-10 feeds per day.',
    feedingDetails: 'Daily Milk Intake: 660-900 ml (22-30 oz). Typically 6-10 feeds per day, may require more during growth spurts.',
    feedingSchedule: '6-10 feeds per day. May require more frequent feeding intervals during growth spurts.',
    crying: '1-6 hours daily.',
    milestones: ['First social smile'],
    summary: 'This week marks a significant milestone as your baby may display his first social smile.',
    type: 'week'
  },
  {
    id: 'week-7',
    title: 'Week 7',
    subtitle: 'Establishing a routine',
    sleep: '14-17 hours daily.',
    feeding: '720-960 ml, 6-9 feeds per day.',
    feedingDetails: 'Total Milk Intake: 720-960 ml (25-33 oz) daily, typically 6-9 feeds spread throughout the day. Gradually extend intervals between feeds.',
    feedingSchedule: '6-9 feeds per day. Gradually extend intervals between feeds to create smoother schedules.',
    crying: '45 mins to 4.5 hours daily.',
    milestones: ['Improved head control'],
    summary: 'At week 7, parents can begin thinking about introducing a gentle routine for their baby.',
    type: 'week'
  },
  {
    id: 'week-8',
    title: 'Week 8',
    subtitle: 'Immunizations',
    sleep: '14-17 hours daily.',
    feeding: '720-960 ml, 6-9 feeds per day.',
    feedingDetails: 'Milk intake: 720-960 ml (25-33 oz) daily, with 6-9 feeds. Be aware of potential milk allergies.',
    feedingSchedule: '6-9 feeds per day. More predictable intervals are likely forming by this stage.',
    crying: 'Expect crying to decrease.',
    milestones: ['First immunizations'],
    summary: 'Your baby should receive immunizations at this age. Expect crying to decrease.',
    type: 'week'
  },
  {
    id: 'week-9',
    title: 'Week 9',
    subtitle: 'More responsive',
    sleep: '14-16 hours daily.',
    feeding: '720-960 ml, 6-9 feeds per day.',
    feedingDetails: 'Total milk needed: 720-960 ml (25-33 oz) daily. Pattern: 6-9 feeds a day. If breastfeeding, maintain a healthy diet and stay hydrated.',
    feedingSchedule: '6-9 feeds per day. Focus on full feeds to encourage longer intervals between feedings.',
    crying: '30 mins to 3.5 hours daily.',
    milestones: ['Holding head up longer', 'Enjoying colorful toys'],
    summary: 'Parents should notice improvements in their baby\'s behavior, as they are likely to be more responsive.',
    type: 'week'
  },
  {
    id: 'week-10',
    title: 'Week 10',
    subtitle: 'Transition to cot',
    sleep: '14-16 hours daily.',
    feeding: '720-1020 ml, 5-8 feeds per day.',
    feedingDetails: 'Total milk required: 720-1020 ml/day, with 5-8 feeds. Babies may become distracted during feeding as their vision improves.',
    feedingSchedule: '5-8 feeds per day. Intervals are extending as the baby consumes more milk per feed.',
    crying: '30 mins to 3 hours daily.',
    milestones: ['3D vision', 'Sitting with support'],
    summary: 'Transition your baby from a Moses basket to a cot as they outgrow the basket.',
    type: 'week'
  },
  {
    id: 'week-11',
    title: 'Week 11',
    subtitle: 'Sleeping more deeply',
    sleep: '14-16 hours daily.',
    feeding: '720-1080 ml, 5-8 feeds per day.',
    feedingDetails: 'Milk Intake: 720-1080 ml (25-37 oz) daily over 5-8 feeds.',
    feedingSchedule: '5-8 feeds per day. A regular feeding pattern is usually well-established by now.',
    crying: '30 mins to 3 hours daily.',
    milestones: ['Colic reduces', 'More robust appearance'],
    summary: 'This week marks a transition for babies as they begin sleeping more deeply and crying less.',
    type: 'week'
  },
  {
    id: 'week-12',
    title: 'Week 12',
    subtitle: 'Less helpless',
    sleep: '14-16 hours daily.',
    feeding: '720-1200 ml, 5-8 feeds per day.',
    feedingDetails: 'Milk intake: 720-1200 ml (25-42 oz) a day, with 5-8 feeds. Growth spurts may occur; be prepared for increased feeding frequency.',
    feedingSchedule: '5-8 feeds per day. Expect increased frequency and shorter intervals during the 3-month growth spurt.',
    crying: 'Around 1 hour daily.',
    milestones: ['Rocking to prepare for rolling over', 'Laughter'],
    summary: 'Three months marks a transition as babies become less helpless and more interactive.',
    type: 'week'
  },
  {
    id: 'month-4',
    title: 'Month 4',
    subtitle: 'Weeks 13-16',
    sleep: '14-16 hours daily.',
    feeding: '720-1200 ml, 5-8 feeds per day.',
    feedingDetails: 'Total Milk Required: 720-1200 ml (25-42 oz) per day. 5-8 feeds a day. Teething can make sucking painful, leading to feeding difficulties.',
    feedingSchedule: '5-8 feeds per day. Night feeds may reduce to 1-3 times as daytime intake increases.',
    crying: 'Decreasing.',
    milestones: ['Pushing up on forearms', 'Exploring hands', 'Teething signs may appear'],
    summary: 'Your baby is transitioning out of the colic stage, allowing for more focus on sleep habits.',
    type: 'month'
  },
  {
    id: 'month-5',
    title: 'Month 5',
    subtitle: 'Weeks 17-20',
    sleep: '14-16 hours daily.',
    feeding: '720-1200 ml, 4-7 feeds per day.',
    feedingDetails: 'Milk requirement: 720-1200 ml (25-42 oz) daily, with 4-7 feeds. Up to 240 ml (8 oz) per feed is common.',
    feedingSchedule: '4-7 feeds per day. Longer intervals between daytime feeds as stomach capacity is larger.',
    crying: 'Less frequent.',
    milestones: ['Sucking feet', 'Rolling back to front'],
    summary: 'Babies may begin sucking their feet and can hold objects with both hands. Rolling from back to front may occur.',
    type: 'month'
  },
  {
    id: 'month-6',
    title: 'Month 6',
    subtitle: 'Weeks 21-24',
    sleep: '14-16 hours daily.',
    feeding: '720-1200 ml. Weaning begins.',
    feedingDetails: 'Milk Intake: 720-1200 ml (25-42 oz) daily. Prepare to introduce solid food as weaning begins at six months. Start with smooth purees or soft finger foods.',
    feedingSchedule: '4-7 milk feeds per day. Introduction of solid foods begins, complementing the established milk schedule.',
    crying: 'Communicating without crying.',
    milestones: ['Sitting up', 'Signs of crawling', 'First solid foods'],
    summary: 'Congratulations on reaching the six-month milestone. Expect significant growth in independence and capabilities.',
    type: 'month'
  }
];
