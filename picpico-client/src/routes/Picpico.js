import {useEffect} from "react";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {Container, Header, Content, Footer} from "rsuite";
import LinkModal from "../components/Modal/LinkModal";
import Decoration from "./Decoration";
import Gallery from "./Gallery";
import Selection from "./Selection";
import PicBooth from "./PicBooth";
import MainController from "../controller/MainController";

// Button
import MuteBtn from "../components/Btn/MuteBtn";
import PicDoneBtn from "../components/Btn/PicDoneBtn";
import TakePicBtn from "../components/Btn/TakePicBtn";
import SelectDoneBtn from "../components/Btn/SelectDoneBtn";
import DecoDoneBtn from "../components/Btn/DecoDoneBtn";
import GalleryDoneBtn from "../components/Btn/GalleryDoneBtn";

// Message
import DecoMessage from "../components/Message/DecoMessage";
import GalleryMessage from "../components/Message/GalleryMessage";
import SelectMessage from "../components/Message/SelectMessage";
import TakePicCountMessage from "../components/Message/TakePicCountMessage";

// List
import MemberList from "../components/List/MemberList";
import TabBar from "../components/TabBar/TabBar";
import DecoList from "../components/List/DecoList";

import "../style/style.css";
import "./Picpico.css";
import store from "../store";
import {setErrorInfo} from "../slice/errorInfo";
import AudioList from "../components/List/AudioList";
import ImgList from "../components/List/ImgList";

const Picpico = () => {
    const {id} = useParams();
    const picBoothDisplay = useSelector(state => state.picpicoInfo.picBoothDisplay);
    const selectDisplay = useSelector(state => state.picpicoInfo.selectionDisplay);
    const decoDisplay = useSelector(state => state.picpicoInfo.decoDisplay);
    const galleryDisplay = useSelector(state => state.picpicoInfo.galleryDisplay);
    const controller = MainController();
    const error = useSelector(state => state.errorInfo.error);
    const nickName = useSelector(state => state.membersInfo.nickname);

    useEffect(() => {
        controller.init(id, nickName);
    }, []);

    return (
        <>
            {picBoothDisplay ? (
                <Container className="default_container">
                    <Header className="picbooth_header">
                        <LinkModal />
                        <h3 style={{fontFamily: "'Palatino Linotype', 'Book Antiqua', Palatino, serif", color: "#7986CB", textAlign: "center"}}>PicPico</h3>
                        <PicDoneBtn />
                    </Header>
                    <Content>
                        <MemberList />
                        <PicBooth />
                    </Content>
                    <Footer className="picbooth_footer">
                        <MuteBtn />
                        <TakePicBtn />
                        <TakePicCountMessage />
                    </Footer>
                </Container>
            ) : selectDisplay ? (
                <Container className="default_container">
                    <Header className="selection_header">
                        <MuteBtn />
                        <SelectMessage />
                        <SelectDoneBtn />
                    </Header>
                    <Content>
                        <AudioList />
                        <MemberList />
                        <Selection />
                    </Content>
                    <Footer className="selection_footer"></Footer>
                </Container>
            ) : decoDisplay ? (
                <Container className="default_container">
                    <Header className="deco_header">
                        <MuteBtn />
                        <DecoMessage />
                        <DecoDoneBtn />
                    </Header>
                    <Content>
                        <AudioList />
                        <MemberList />
                        <Decoration controller={controller} />
                    </Content>

                    {/* Color List & Sticker List */}
                    <Footer>
                        <DecoList />
                    </Footer>
                    <Footer className="deco_footer">
                        <Footer>
                            <TabBar />
                        </Footer>
                    </Footer>
                </Container>
            ) : galleryDisplay ? (
                <Container className="default_container">
                    <Header className="gallery_header">
                        <MuteBtn />
                        <GalleryMessage />
                        <GalleryDoneBtn />
                    </Header>
                    <Content style={{marginTop: "80"}}>
                        <AudioList />
                        <ImgList />
                        <Gallery />
                    </Content>
                </Container>
            ) : null}
        </>
    );
};
export default Picpico;
