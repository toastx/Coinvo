import { ChatUIProvider,ChatViewComponent,MessageInput,ChatViewList} from "@pushprotocol/uiweb";
import { darkChatTheme } from "@pushprotocol/uiweb";
import MyButton from "./Buttons";


function ChatUi() {
  return (
    <div>
      <ChatUIProvider  env={'staging'} theme={darkChatTheme}>
      <ChatViewComponent
      chatId="51bf3a48ef9bc315401e7ac8cbd686562459aa30dbf6a90de6976ccd76c4c56b"
      // chatId="51bf3a48ef9bc315401e7ac8cbd686562459aa30dbf6a90de6976ccd76c4c56b" public group
      limit={10}
      isConnected={true}
    />
    </ChatUIProvider>

    < MyButton />
    </div>
    
    // <ChatViewListCard>
    //   <ChatViewList
    //     chatId="330cae5f963f2df3d6d692a7075317c906468e3fe60bfb8280a7e125208939e1"
    //     limit={10}
    //   />
    // </ChatViewListCard>
    // <MessageInput chatId={'330cae5f963f2df3d6d692a7075317c906468e3fe60bfb8280a7e125208939e1'} emoji={false} gif={false} file={false} />
  );
}

export default ChatUi;