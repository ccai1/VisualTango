##########################################
# This is a Blender script
# should by copy the text into Blender
# This basically generate all the frames using
# the poses.
##########################################

import bpy

scene = bpy.context.scene
# get current frame using scene.frame_current

# choose whole body bones
bpy.ops.pose.select_all(action='SELECT')

index = 0

# standing
scene.frame_set(index)
bpy.ops.poselib.apply_pose(pose_index=1)
bpy.ops.anim.keyframe_insert_menu(type='WholeCharacter')

# direction
for direction in ["north", "northwest", "northeast"]:
    # height
    for height in ["high", "low"]:
        # weighted foot
        for weight in ["left", "right"]:
            # unweighted foot
            for unweighted in ["collected", "crossed-forward", "forward", "backward", "in-air-forward", "in-air-backward", "slide-out-side", "wrapped-around-front"]:
                # leaning
                for leaning in ["neutral", "forward", "backward", "toward-weighted", "toward-unweighted"]:
                    index += 1
                    bpy.ops.pose.select_all(action='SELECT')
                    scene.frame_set(index)

                    # apply the initial standing pose to whole body
                    bpy.ops.poselib.apply_pose(pose_index=1)

                    # apply hand pose
                    bpy.ops.poselib.apply_pose(pose_index=11)

                    # apply direction
                    if direction == "north":
                        bpy.ops.poselib.apply_pose(pose_index=2)
                    elif direction == "northwest":
                        bpy.ops.poselib.apply_pose(pose_index=3)
                    else:
                        bpy.ops.poselib.apply_pose(pose_index=4)

                    # apply weighted foot with height feature
                    if weight == "left" and height == "high":
                        bpy.ops.poselib.apply_pose(pose_index=25)
                    elif weight == "right" and height == "high":
                        bpy.ops.poselib.apply_pose(pose_index=24)
                    elif weight == "left" and height == "low":
                        bpy.ops.poselib.apply_pose(pose_index=6)
                    else:
                        bpy.ops.poselib.apply_pose(pose_index=5)

                    # apply unweighted foot with height feature
                    if height == "high" and weight == "left":
                        if unweighted == "collected":
                            bpy.ops.poselib.apply_pose(pose_index=26)
                        elif unweighted == "crossed-forward":
                            bpy.ops.poselib.apply_pose(pose_index=28)
                        elif unweighted == "forward":
                            bpy.ops.poselib.apply_pose(pose_index=30)
                        elif unweighted == "backward":
                            bpy.ops.poselib.apply_pose(pose_index=32)
                        elif unweighted == "in-air-forward":
                            bpy.ops.poselib.apply_pose(pose_index=34)
                        elif unweighted == "in-air-backward":
                            bpy.ops.poselib.apply_pose(pose_index=36)
                        elif unweighted == "slide-out-side":
                            bpy.ops.poselib.apply_pose(pose_index=38)
                        else:  # "wrapped-around-front"
                            bpy.ops.poselib.apply_pose(pose_index=40)
                    elif height == "high" and weight == "right":
                        if unweighted == "collected":
                            bpy.ops.poselib.apply_pose(pose_index=27)
                        elif unweighted == "crossed-forward":
                            bpy.ops.poselib.apply_pose(pose_index=29)
                        elif unweighted == "forward":
                            bpy.ops.poselib.apply_pose(pose_index=31)
                        elif unweighted == "backward":
                            bpy.ops.poselib.apply_pose(pose_index=33)
                        elif unweighted == "in-air-forward":
                            bpy.ops.poselib.apply_pose(pose_index=35)
                        elif unweighted == "in-air-backward":
                            bpy.ops.poselib.apply_pose(pose_index=37)
                        elif unweighted == "slide-out-side":
                            bpy.ops.poselib.apply_pose(pose_index=39)
                        else:  # "wrapped-around-front"
                            bpy.ops.poselib.apply_pose(pose_index=41)
                    elif height == "low" and weight == "left":
                        if unweighted == "collected":
                            bpy.ops.poselib.apply_pose(pose_index=7)
                        elif unweighted == "crossed-forward":
                            bpy.ops.poselib.apply_pose(pose_index=9)
                        elif unweighted == "forward":
                            bpy.ops.poselib.apply_pose(pose_index=13)
                        elif unweighted == "backward":
                            bpy.ops.poselib.apply_pose(pose_index=14)
                        elif unweighted == "in-air-forward":
                            bpy.ops.poselib.apply_pose(pose_index=16)
                        elif unweighted == "in-air-backward":
                            bpy.ops.poselib.apply_pose(pose_index=18)
                        elif unweighted == "slide-out-side":
                            bpy.ops.poselib.apply_pose(pose_index=20)
                        else:  # "wrapped-around-front"
                            bpy.ops.poselib.apply_pose(pose_index=22)
                    else:  # height == "low" and weight == "right"
                        if unweighted == "collected":
                            bpy.ops.poselib.apply_pose(pose_index=8)
                        elif unweighted == "crossed-forward":
                            bpy.ops.poselib.apply_pose(pose_index=10)
                        elif unweighted == "forward":
                            bpy.ops.poselib.apply_pose(pose_index=12)
                        elif unweighted == "backward":
                            bpy.ops.poselib.apply_pose(pose_index=15)
                        elif unweighted == "in-air-forward":
                            bpy.ops.poselib.apply_pose(pose_index=17)
                        elif unweighted == "in-air-backward":
                            bpy.ops.poselib.apply_pose(pose_index=19)
                        elif unweighted == "slide-out-side":
                            bpy.ops.poselib.apply_pose(pose_index=21)
                        else:  # "wrapped-around-front"
                            bpy.ops.poselib.apply_pose(pose_index=23)

                    # leaning
                    if height == "high":
                        if leaning == "neutral":
                            pass
                        elif leaning == "forward":
                            if weight == "left":
                                bpy.ops.poselib.apply_pose(pose_index=47)
                            else:
                                bpy.ops.poselib.apply_pose(pose_index=46)
                        elif leaning == "backward":
                            if weight == "left":
                                bpy.ops.poselib.apply_pose(pose_index=49)
                            else:
                                bpy.ops.poselib.apply_pose(pose_index=48)
                        elif leaning == "toward-weighted":
                            if weight == "left":
                                bpy.ops.poselib.apply_pose(pose_index=57)
                            else:  # right
                                bpy.ops.poselib.apply_pose(pose_index=55)
                        else:  # "toward-unweighted"
                            if weight == "left":
                                bpy.ops.poselib.apply_pose(pose_index=56)
                            else:  # right
                                bpy.ops.poselib.apply_pose(pose_index=54)
                    else:  # low
                        if leaning == "neutral":
                            pass
                        elif leaning == "forward":
                            if weight == "left":
                                bpy.ops.poselib.apply_pose(pose_index=43)
                            else:  # right
                                bpy.ops.poselib.apply_pose(pose_index=42)
                        elif leaning == "backward":
                            if weight == "left":
                                bpy.ops.poselib.apply_pose(pose_index=45)
                            else:  # right
                                bpy.ops.poselib.apply_pose(pose_index=44)
                        elif leaning == "toward-weighted":
                            if weight == "left":
                                bpy.ops.poselib.apply_pose(pose_index=53)
                            else:  # right
                                bpy.ops.poselib.apply_pose(pose_index=51)
                        else:  # "toward-unweighted"
                            if weight == "left":
                                bpy.ops.poselib.apply_pose(pose_index=52)
                            else:  # right
                                bpy.ops.poselib.apply_pose(pose_index=50)

                    # insert into a new frame
                    bpy.ops.anim.keyframe_insert_menu(type='WholeCharacter')
