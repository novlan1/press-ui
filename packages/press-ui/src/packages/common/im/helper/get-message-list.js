import { waitReady } from './wait-ready';


export async function getMessageList({
  conversationId,
  // count = 15,
  nextMsgId,
  tim,
}) {
  await waitReady(tim);

  return await tim.getMessageList({
    conversationID: conversationId,
    // count,
    nextReqMessageID: nextMsgId,
  });
}
