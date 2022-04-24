import React, { useEffect } from "react";
import { connect } from "react-redux";
import Loader from "react-loader-spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import Modal from "components/Modal";
import { breakpointColumns } from "utils/helper";
import {
	GalleryImage,
	GalleryItem,
	LoadingSpinner,
	Message,
	StyledMasonry,
} from "styles";
import { fetchUserPhotos, handleModal } from "store/user/userActions";
import { useParams } from "react-router-dom";

const UserPhotos = (props) => {
	const { username } = useParams();

	const { fetchUserPhotos } = props;
	useEffect(() => {
		fetchUserPhotos(username);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		fetchUserPhotos(username);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [username]);

	const { photos, hasMore, isLoading, index } = props.user;

	return (
		<>
			{photos.length === 0 && isLoading ? (
				<LoadingSpinner>
					<Loader type="ThreeDots" color="#32D3AC" />
				</LoadingSpinner>
			) : (
				<>
					{photos.length > 0 && (
						<InfiniteScroll
							dataLength={photos.length}
							next={() => props.fetchUserPhotos(username)}
							hasMore={hasMore}
							loader={
								<LoadingSpinner>
									<Loader type="ThreeDots" color="#32D3AC" />
								</LoadingSpinner>
							}
							endMessage={
								<Message>
									<b>There are no more photos</b>
								</Message>
							}>
							<StyledMasonry
								breakpointCols={breakpointColumns}
								columnClassName="masonry-grid_column">
								{photos.map((photo, index) => (
									<GalleryItem key={photo.id}>
										<GalleryImage
											src={photo.urls.small}
											alt={photo.description}
											onClick={() => props.handleModal(index)}
										/>
									</GalleryItem>
								))}
							</StyledMasonry>
							{index > -1 && (
								<Modal
									photos={photos}
									index={index}
									hideModal={() => props.handleModal(-1)}
								/>
							)}
						</InfiniteScroll>
					)}
				</>
			)}
		</>
	);
};

const mapStateToProps = (state) => ({
	user: state.user,
});
const mapDispatchToProps = {
	fetchUserPhotos,
	handleModal,
};
export default connect(mapStateToProps, mapDispatchToProps)(UserPhotos);
