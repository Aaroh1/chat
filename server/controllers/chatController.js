const supabase = require("../config/supabase.config")

exports.startConversation = async (socket, params) => {
  const { conversation, user, io } = params;
  try {
    if (!conversation) 
      throw new Error("conversation is empty");
      const sortedOldMessages = await supabase.from('messages').select('*').eq('conversation_id',conversation).order('created_at',{ascending:true})
       console.log(`Message history found in conversation ${conversation}!`);
        socket.join(conversation.toString());
        console.log("joined room ", socket.id);
        io.in(conversation.toString()).emit("conversationStarted", {
          messages: sortedOldMessages,
        });
         console.log("conversationStarted event emitted");
      } catch (error) {
    console.log(error)
};}

exports.newMessage = async (socket, params) => {
  const { conversation, text, user, io } = params;
  try {
    console.log("new Message!")
    const Message = await supabase.from("messages").insert({user_id:user, message:text, conversation_id:conversation})
    const sender = await supabase.from("messages").select("*").eq('user_id', user);
    const saveMessage = await supabase
      .from("messages")
      .select("*")
      .eq("user_id", user).eq('conversation_id',conversation)
      .order("created_at", { ascending: false })
      .limit(1);
      console.log("New message added");
      io.in(conversation.toString()).emit("newMessageReceived", {msg:saveMessage, user:sender});
      console.log("newMessageReceived event emitted");
  } catch (error) {
    console.log(error)
}};

exports.checkConversation = async (req, res, next) => {
  try {
    const { user } = req.params;
    const userConvos = await supabase
      .from("conversations")
      .select("*")
      .eq("participant_user_id", user)
    res.status(200).send(userConvos);
  } catch (error) {
    res.status(400).send(error);
  }
};


exports.newConversation = async (req, res, next) => {
  try {
    const { user } = req.body;
    const userConvos = await supabase
      .from("conversations")
      .insert({ participant_user_id: user });
    res.status(200).send(userConvos);
  } catch (error) {
    res.status(400).send(error);
  }
}
