export const restaurant_ids = {
  1: '3eb6cc7e-36f2-49af-b675-902cf3a0df36',
  2: '62667f43-2421-4965-b978-d1f02a22f796',
  3: 'a469542a-85ff-4379-932d-d1a7cd3f25e1',
  4: '1b5fe03a-d628-48ea-9bd5-7149e082bf40',
  5: 'ddaa1666-37f8-4003-9e69-708b1d8090b6',
  6: '9d01826e-5870-4631-9995-c438b7094ee7',
  7: 'bcc91d5e-1d51-4b41-9a39-685d0f1c413f',
  8: '3fa9e46c-95f8-4245-aaff-7097a166fd1a',
  9: 'e743589c-6343-417e-8585-9570d47b3f0b',
  10: '35ef3f07-9ce2-4eef-a96c-4bfdf378ee89',
  11: '988a11ee-dbd2-4e1a-b86a-879b8666a9dc',
  12: '1b5c10f3-0ce3-49f5-bf1a-9dab7dad59bd',
};

export const client_ids = {
  1: '5526406b-9f8f-40fd-ab39-ed9a45d11663',
  2: '73bd4287-5a06-4428-9317-ee44eba124fe',
  3: 'cc4ece74-51a1-444c-8959-064d54a09914',
  4: 'f2bc17f4-d124-4432-88f1-e972765f997c',
  5: 'a5b407ab-5730-48ab-9016-11af93793149',
  6: 'eb9b523e-5290-436e-a93b-9972c7fadad3',
  7: '9a31d3d3-8203-49d7-9aa5-2e15c037c887',
  8: 'd3dd64b8-627d-4c49-ac56-0f7b9f729399',
  9: '3701c14a-17ac-4804-8fd0-a5d796bec2ee',
  10: 'cf83e71d-c129-41f3-af36-9a42bb25a38b',
};

export function randomComment() {
  const comments = [
    `It was great! Crawfish were seasoned perfectly, even bought some seasoning from the market inside of the restaurant. We were seated quickly, service was wonderful. They were very accommodating to the children in our party.`,
    `Fantastic. Food and drinks were great. Waitress was busy but she never forgot about us.`,
    `Some food items were great and others not so good. I highly recommend the stuffed mushrooms and the cheesecake. The crab I ordered to top my salad was no good and the Atchafalaya meal was too salty.`,
    `The food was fresh and delicious and served in a timely manner. Our waitress was very pleasant and attentive.`,
    `Everyone enjoyed the food and atmosphere. The only negative comment was the amount of food on the grilled seafood platter and the bread pudding.`,
    `Delicious food was very impressed. Staff was helpful and even gave gloves for crawfish to protect hands. We stayed at Cajun palms and was very convenient. Food came out in timely manner`,
    `The food as usual was delicious as was the service impeccable. Always enjoy going here.`,
    `I love this restaurant. The food is great and the service is excellent. They have a really good wine selection. You can go casual or dressy and feel welcomed and comfortable.`,
    `We were seated immediately upon arrival and received water and silverware at our outdoor table. Once we ordered, our wine and salads appeared quickly. We split a very generous portion of lasagna, and it was excellent!`,
    `Our first time there. Gabby helped us choose our selections. She chose wisely as our meal was incredible. Great ambience. Really fun evening. We will be back next time we visit Lafayette.`,
    `My fiance and I thoroughly enjoyed Marcello's, it's a hidden gem. I would definitely recommend for special or romantic occasions. The food was delicious and the service was outstanding!`,
  ];

  return comments[Math.floor(Math.random() * (9 - 0) - 0)];
}
