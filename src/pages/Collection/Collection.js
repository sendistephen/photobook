/* eslint-disable react-hooks/exhaustive-deps */
import Loader from "react-loader-spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import { Modal } from "components";
import React, { useEffect } from "react";
import { breakpointColumns } from "utils/helper";
import {
	fetchCollection,
	fetechSingleCollection,
	handleModal,
	clearCollection,
} from "store/collections/collectionsActions";
import {
	Gallery,
	Wrapper,
	TagsWrapper,
	Image,
	ImageWrapper,
	StyledLink,
	Title,
	Tag,
	Stats,
} from "./Collection.styles";
import {
	Container,
	GalleryImage,
	GalleryItem,
	LoadingSpinner,
	Message,
} from "styles";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

const Collection = (props) => {
	const { collectionId } = useParams();

	// fetch collection details on mount
	useEffect(() => {
		props.fetchCollection(collectionId);
		props.fetechSingleCollection(collectionId);
	}, []);

	useEffect(() => {
		props.fetchCollection(collectionId);
	}, [collectionId]);

	// clear collections for previous search results on unmount
	useEffect(() => {
		props.clearCollection();
	}, [collectionId]);

	const { userPhotoCollection, collection, index, isLoading, hasMore } =
		props.collections;

	return (
		<Container>
			{collection.user && (
				<Wrapper>
					<Title>#{collection.title}</Title>
					<TagsWrapper>
						{collection.tags.map((tag) => (
							<Tag key={tag.title}>{tag.title}</Tag>
						))}
					</TagsWrapper>
					<ImageWrapper>
						<Image
							src={collection.user.profile_image.medium}
							alt={collection.user.username}
						/>
						<StyledLink to={`/users/${collection.user.username}`}>
							{collection.user.username}
						</StyledLink>
					</ImageWrapper>
					<Stats>{collection.total_photos} photos</Stats>
				</Wrapper>
			)}

			{userPhotoCollection.length === 0 && isLoading ? (
				<LoadingSpinner>
					<Loader type="ThreeDots" color="#32D3AC" />
				</LoadingSpinner>
			) : (
				<InfiniteScroll
					dataLength={userPhotoCollection.length}
					next={() => props.fetchCollection(collectionId)}
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
					<Gallery
						breakpointCols={breakpointColumns}
						columnClassName="masonry-grid_column">
						{userPhotoCollection.map((photo, index) => (
							<GalleryItem key={photo.id}>
								<GalleryImage
									src={photo.urls.small}
									alt={photo.description}
									onClick={() => props.handleModal(index)}
								/>
							</GalleryItem>
						))}
					</Gallery>
					{index > -1 && (
						<Modal
							photos={userPhotoCollection}
							index={index}
							hideModal={() => props.handleModal(-1)}
						/>
					)}
				</InfiniteScroll>
			)}
		</Container>
	);
};

const mapStateToProps = (state) => ({
	collections: state.collections,
});
const mapDispatchToProps = {
	fetchCollection,
	fetechSingleCollection,
	handleModal,
	clearCollection,
};
export default connect(mapStateToProps, mapDispatchToProps)(Collection);
