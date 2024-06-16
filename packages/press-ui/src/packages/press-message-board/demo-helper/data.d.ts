export declare const MOCK_MESSAGE_BOARD_LIST: ({
  msg_id: string;
  content_info: string;
  content_type: number;
  msg_type: number;
  uid: string;
  nick: string;
  create_time: string;
  comm_list?: undefined;
} | {
  msg_id: string;
  content_info: string;
  content_type: number;
  msg_type: number;
  uid: string;
  nick: string;
  create_time: string;
  comm_list: ({
    comm_id: string;
    content_info: string;
    content_type: number;
    msg_id: string;
    level: number;
    uid: string;
    nick: string;
    create_time: string;
    comm_list: {
      comm_id: string;
      content_info: string;
      content_type: number;
      msg_id: string;
      parent_comm_id: string;
      level: number;
      uid: string;
      nick: string;
      parent_uid: string;
      create_time: string;
      parent_nick: string;
    }[];
    parent_comm_id?: undefined;
    parent_uid?: undefined;
    parent_nick?: undefined;
  } | {
    comm_id: string;
    content_info: string;
    content_type: number;
    msg_id: string;
    parent_comm_id: string;
    level: number;
    uid: string;
    nick: string;
    create_time: string;
    parent_uid: string;
    parent_nick: string;
    comm_list?: undefined;
  })[];
})[];
